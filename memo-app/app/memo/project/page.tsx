'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { 
  ProjectMemoData, priorityLevels, companyPriorities, projectTypes,
  avatars, promotionChannels, salesMechanisms, missionChecks, capacityOptions
} from '@/lib/memoTypes';
import { 
  FormSection, FormField, TextInput, TextArea, 
  RadioGroup, CheckboxGroup, TeamMemberTable, ObjectionsList, RisksList
} from '@/components/FormComponents';

export default function ProjectMemoPage() {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  
  const [data, setData] = useState<ProjectMemoData>({
    projectName: '',
    submittedBy: '',
    date: new Date().toISOString().split('T')[0],
    projectType: '',
    priorityLevel: '',
    companyPriority: [],
    targetLaunchDate: '',
    hardDeadline: '',
    teamMembers: [{ person: '', role: '', hours: '', when: '', confirmed: false }],
    responsible: '',
    accountable: '',
    consulted: '',
    informed: '',
    approver: '',
    problem: '',
    problemCost: '',
    proposal: '',
    proposalOutcome: '',
    proofPast: '',
    proofExternal: '',
    targetAudience: '',
    avatars: [],
    promotionChannels: [],
    contentNeeded: '',
    preFrameStrategy: '',
    trafficNeeded: '',
    currentReach: '',
    offerDescription: '',
    pricePoint: '',
    offerName: '',
    whyBuyNow: '',
    objections: [{ objection: '', response: '' }],
    salesMechanism: [],
    whoSells: '',
    conversionTarget: '',
    budgetRequired: '',
    externalResources: '',
    capacityCheck: '',
    deprioritize: '',
    dependencies: '',
    deliveryPlan: '',
    qualityControl: '',
    missionAlignment: [],
    missionJustification: '',
    risks: [{ risk: '', mitigation: '' }],
    killSwitch: '',
    primaryMetric: '',
    secondaryMetrics: '',
    reviewDate: '',
  });

  const updateData = (field: keyof ProjectMemoData, value: any) => {
    setData({ ...data, [field]: value });
  };

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { ProjectMemoPDF } = await import('@/components/ProjectMemoPDF');
      const blob = await pdf(<ProjectMemoPDF data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Project-Memo-${data.projectName || 'Draft'}-${data.date}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
    setGenerating(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
      <button
        onClick={() => router.push('/')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to start
      </button>

      <div className="text-center mb-8">
        <div className="inline-block bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-3">
          Project Memo
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Project Memo</h1>
        <p className="text-gray-600 mt-1">For campaigns, new offers, system builds, content series</p>
        <p className="text-gray-500 text-sm mt-1">Estimated time: 30-60 minutes</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); generatePDF(); }} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <FormField label="Project Name">
            <TextInput 
              value={data.projectName} 
              onChange={(v) => updateData('projectName', v)} 
              placeholder="Give it a memorable name" 
            />
          </FormField>
          <FormField label="Submitted by">
            <TextInput 
              value={data.submittedBy} 
              onChange={(v) => updateData('submittedBy', v)} 
              placeholder="Your name" 
            />
          </FormField>
          <FormField label="Date">
            <TextInput 
              value={data.date} 
              onChange={(v) => updateData('date', v)} 
              placeholder="YYYY-MM-DD" 
            />
          </FormField>
          <FormField label="Project Type">
            <select 
              value={data.projectType} 
              onChange={(e) => updateData('projectType', e.target.value)}
              className="form-input"
            >
              <option value="">Select type...</option>
              {projectTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </FormField>
        </div>

        {/* Priority Section */}
        <FormSection title="PRIORITY & TIMELINE" color="bg-red-500">
          <FormField label="Priority Level">
            <RadioGroup 
              options={priorityLevels} 
              value={data.priorityLevel} 
              onChange={(v) => updateData('priorityLevel', v)}
              name="priority"
            />
          </FormField>

          <FormField label="Which company priority does this support?">
            <CheckboxGroup 
              options={companyPriorities.slice(0, 5)} 
              values={data.companyPriority} 
              onChange={(v) => updateData('companyPriority', v)} 
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Target Launch Date">
              <TextInput 
                value={data.targetLaunchDate} 
                onChange={(v) => updateData('targetLaunchDate', v)} 
                placeholder="Specific date or week" 
              />
            </FormField>
            <FormField label="Hard Deadline? Why?">
              <TextInput 
                value={data.hardDeadline} 
                onChange={(v) => updateData('hardDeadline', v)} 
                placeholder="Is this tied to an event?" 
              />
            </FormField>
          </div>
        </FormSection>

        {/* Team Section */}
        <FormSection title="TEAM REQUIREMENTS" color="bg-blue-500">
          <FormField label="Project Team">
            <TeamMemberTable 
              members={data.teamMembers} 
              onChange={(v) => updateData('teamMembers', v)}
              showWhen={true}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <FormField label="RESPONSIBLE (Does the work)">
              <TextInput 
                value={data.responsible} 
                onChange={(v) => updateData('responsible', v)} 
                placeholder="Names - who executes" 
              />
            </FormField>
            <FormField label="ACCOUNTABLE (Owns outcome)">
              <TextInput 
                value={data.accountable} 
                onChange={(v) => updateData('accountable', v)} 
                placeholder="Single name - buck stops here" 
              />
            </FormField>
            <FormField label="CONSULTED (Input needed)">
              <TextInput 
                value={data.consulted} 
                onChange={(v) => updateData('consulted', v)} 
                placeholder="Names - must give input" 
              />
            </FormField>
            <FormField label="INFORMED (Keep in loop)">
              <TextInput 
                value={data.informed} 
                onChange={(v) => updateData('informed', v)} 
                placeholder="Names - notify when things happen" 
              />
            </FormField>
          </div>

          <FormField label="Who must APPROVE before we proceed?">
            <TextInput 
              value={data.approver} 
              onChange={(v) => updateData('approver', v)} 
              placeholder="Names and what they're approving" 
            />
          </FormField>
        </FormSection>

        {/* Part A: The Core */}
        <FormSection title="PART A: THE CORE" color="bg-slate-800">
          <FormField label="1. What specific problem are we solving?">
            <TextArea 
              value={data.problem} 
              onChange={(v) => updateData('problem', v)} 
              placeholder="Be specific - who has this problem and why does it matter?"
            />
          </FormField>

          <FormField label="What's the cost of NOT solving this?">
            <TextArea 
              value={data.problemCost} 
              onChange={(v) => updateData('problemCost', v)} 
              placeholder="Revenue lost, time wasted, clients affected, etc."
            />
          </FormField>

          <FormField 
            label="2. What exactly are we doing?"
            note="Explain it like you're talking to someone two drinks deep in an Uber. Keep it simple."
          >
            <TextArea 
              value={data.proposal} 
              onChange={(v) => updateData('proposal', v)} 
              placeholder="One paragraph max - if it's longer, you haven't figured it out yet"
            />
          </FormField>

          <FormField label="What's the specific outcome?">
            <TextArea 
              value={data.proposalOutcome} 
              onChange={(v) => updateData('proposalOutcome', v)} 
              placeholder="What result will we achieve? Be measurable."
            />
          </FormField>

          <FormField label="3. Past results that support this">
            <TextArea 
              value={data.proofPast} 
              onChange={(v) => updateData('proofPast', v)} 
              placeholder="Reference specific wins, data, or examples"
            />
          </FormField>

          <FormField label="External validation">
            <TextArea 
              value={data.proofExternal} 
              onChange={(v) => updateData('proofExternal', v)} 
              placeholder="Competitors doing this? Industry trends?"
            />
          </FormField>
        </FormSection>

        {/* Part B: Marketing */}
        <FormSection title="PART B: MARKETING & TRAFFIC" color="bg-blue-700">
          <FormField 
            label="4. Who specifically is this for?"
            note="Dog whistle: 'If you're a [person] who [situation], this is for you'"
          >
            <TextArea 
              value={data.targetAudience} 
              onChange={(v) => updateData('targetAudience', v)} 
              placeholder="Be specific about who this is for"
            />
          </FormField>

          <FormField label="Which avatar(s)?">
            <CheckboxGroup 
              options={avatars} 
              values={data.avatars} 
              onChange={(v) => updateData('avatars', v)} 
            />
          </FormField>

          <FormField label="5. How will people find out about this?">
            <CheckboxGroup 
              options={promotionChannels} 
              values={data.promotionChannels} 
              onChange={(v) => updateData('promotionChannels', v)} 
            />
          </FormField>

          <FormField label="Content pieces needed">
            <TextArea 
              value={data.contentNeeded} 
              onChange={(v) => updateData('contentNeeded', v)} 
              placeholder="List specific content: # of posts, videos, emails, etc."
            />
          </FormField>

          <FormField 
            label="Pre-frame strategy"
            note="How will you warm up the audience BEFORE the pitch? (Pre-framing is everything)"
          >
            <TextArea 
              value={data.preFrameStrategy} 
              onChange={(v) => updateData('preFrameStrategy', v)} 
              placeholder="What content/touchpoints happen before the offer?"
            />
          </FormField>

          <FormField 
            label="6. How many leads/eyeballs do we need?"
            note="Work backwards: 'What would make it UNREASONABLE for this to fail?'"
          >
            <TextArea 
              value={data.trafficNeeded} 
              onChange={(v) => updateData('trafficNeeded', v)} 
              placeholder="Target: X leads needed to hit Y conversions"
            />
          </FormField>

          <FormField label="Current reach we can leverage">
            <TextInput 
              value={data.currentReach} 
              onChange={(v) => updateData('currentReach', v)} 
              placeholder="Email list size, social followers, ad budget" 
            />
          </FormField>
        </FormSection>

        {/* Part C: Sales */}
        <FormSection title="PART C: SALES & CONVERSION" color="bg-green-700">
          <FormField label="7. What exactly are we selling?">
            <TextArea 
              value={data.offerDescription} 
              onChange={(v) => updateData('offerDescription', v)} 
              placeholder="Product/service name and what's included"
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Price point">
              <TextInput 
                value={data.pricePoint} 
                onChange={(v) => updateData('pricePoint', v)} 
                placeholder="$X - and why this price?" 
              />
            </FormField>
            <FormField 
              label="Offer name"
              note="Named systems sell better: 'The 412 Open House Formula' > 'my process'"
            >
              <TextInput 
                value={data.offerName} 
                onChange={(v) => updateData('offerName', v)} 
                placeholder="Give it a memorable name" 
              />
            </FormField>
          </div>

          <FormField label="8. Why should they buy NOW?">
            <TextArea 
              value={data.whyBuyNow} 
              onChange={(v) => updateData('whyBuyNow', v)} 
              placeholder="Urgency, scarcity, or compelling reason"
            />
          </FormField>

          <FormField label="What objections will they have?">
            <ObjectionsList 
              objections={data.objections} 
              onChange={(v) => updateData('objections', v)} 
            />
          </FormField>

          <FormField label="9. How will people buy?">
            <CheckboxGroup 
              options={salesMechanisms} 
              values={data.salesMechanism} 
              onChange={(v) => updateData('salesMechanism', v)} 
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Who's doing the selling?">
              <TextInput 
                value={data.whoSells} 
                onChange={(v) => updateData('whoSells', v)} 
                placeholder="Team member responsible" 
              />
            </FormField>
            <FormField label="Conversion target">
              <TextInput 
                value={data.conversionTarget} 
                onChange={(v) => updateData('conversionTarget', v)} 
                placeholder="X% = Y sales = $Z revenue" 
              />
            </FormField>
          </div>
        </FormSection>

        {/* Part D: Operations */}
        <FormSection title="PART D: OPERATIONS CHECK" color="bg-orange-700">
          <FormField label="10. Budget required">
            <TextInput 
              value={data.budgetRequired} 
              onChange={(v) => updateData('budgetRequired', v)} 
              placeholder="$X total - broken down: ads $X, tools $X, other $X" 
            />
          </FormField>

          <FormField label="External resources needed">
            <TextInput 
              value={data.externalResources} 
              onChange={(v) => updateData('externalResources', v)} 
              placeholder="Contractors, agencies, tools, etc." 
            />
          </FormField>

          <FormField 
            label="11. Do we have capacity to execute this?"
            note="Be honest here. If we're already stretched, this needs to be flagged."
          >
            <RadioGroup 
              options={capacityOptions} 
              value={data.capacityCheck} 
              onChange={(v) => updateData('capacityCheck', v)}
              name="capacity"
            />
          </FormField>

          <FormField label="What gets deprioritized if we do this?">
            <TextArea 
              value={data.deprioritize} 
              onChange={(v) => updateData('deprioritize', v)} 
              placeholder="Be specific - what drops or gets delayed?"
            />
          </FormField>

          <FormField label="Dependencies / blockers">
            <TextArea 
              value={data.dependencies} 
              onChange={(v) => updateData('dependencies', v)} 
              placeholder="What needs to happen first? What could stop us?"
            />
          </FormField>

          <FormField label="12. If this works, can we deliver?">
            <TextArea 
              value={data.deliveryPlan} 
              onChange={(v) => updateData('deliveryPlan', v)} 
              placeholder="How do we fulfill if we get 10 sales? 50? 100?"
            />
          </FormField>

          <FormField label="Quality control">
            <TextArea 
              value={data.qualityControl} 
              onChange={(v) => updateData('qualityControl', v)} 
              placeholder="How do we ensure quality doesn't drop?"
            />
          </FormField>
        </FormSection>

        {/* Part E: Decision */}
        <FormSection title="PART E: DECISION TIME" color="bg-purple-700">
          <FormField label="13. 2031 Mission Check">
            <CheckboxGroup 
              options={missionChecks} 
              values={data.missionAlignment} 
              onChange={(v) => updateData('missionAlignment', v)} 
            />
          </FormField>

          <FormField label="If any box is unchecked, explain why we should still do it">
            <TextArea 
              value={data.missionJustification} 
              onChange={(v) => updateData('missionJustification', v)} 
              placeholder="Justification if needed"
            />
          </FormField>

          <FormField label="14. What could go wrong?">
            <RisksList 
              risks={data.risks} 
              onChange={(v) => updateData('risks', v)} 
            />
          </FormField>

          <FormField label="Kill switch">
            <TextArea 
              value={data.killSwitch} 
              onChange={(v) => updateData('killSwitch', v)} 
              placeholder="At what point do we stop/pivot if it's not working?"
            />
          </FormField>

          <FormField label="15. Primary success metric">
            <TextInput 
              value={data.primaryMetric} 
              onChange={(v) => updateData('primaryMetric', v)} 
              placeholder="The ONE number that matters most" 
            />
          </FormField>

          <FormField label="Secondary metrics">
            <TextInput 
              value={data.secondaryMetrics} 
              onChange={(v) => updateData('secondaryMetrics', v)} 
              placeholder="Supporting indicators" 
            />
          </FormField>

          <FormField label="Review date">
            <TextInput 
              value={data.reviewDate} 
              onChange={(v) => updateData('reviewDate', v)} 
              placeholder="When do we check in on results?" 
            />
          </FormField>
        </FormSection>

        {/* Submit */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={generating}
            className="w-full bg-blue-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Project Memo PDF
              </>
            )}
          </button>
          <p className="text-center text-gray-500 text-sm mt-3">
            PDF will be downloaded for you to share with the team
          </p>
        </div>
      </form>
    </div>
  );
}
