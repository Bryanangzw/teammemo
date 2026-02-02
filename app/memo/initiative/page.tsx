'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { 
  InitiativeMemoData, priorityLevels, companyPriorities, initiativeTypes,
  phases2031, missionChecks, capacityOptions
} from '@/lib/memoTypes';
import { 
  FormSection, FormField, TextInput, TextArea, 
  RadioGroup, CheckboxGroup, TeamMemberTable, RisksList,
  MilestonesList, BudgetList, AlternativesList
} from '@/components/FormComponents';

export default function InitiativeMemoPage() {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  
  const [data, setData] = useState<InitiativeMemoData>({
    projectName: '',
    submittedBy: '',
    date: new Date().toISOString().split('T')[0],
    projectType: '',
    initiativeType: '',
    priorityLevel: '',
    companyPriority: [],
    phase2031: [],
    targetLaunchDate: '',
    hardDeadline: '',
    teamMembers: [{ person: '', role: '', hours: '', when: '', confirmed: false }],
    responsible: '',
    accountable: '',
    consulted: '',
    informed: '',
    approver: '',
    executiveSummaryOpportunity: '',
    executiveSummaryProposal: '',
    executiveSummaryAsk: '',
    investmentRequired: '',
    expectedReturn: '',
    currentState: '',
    marketContext: '',
    competitiveLandscape: '',
    problem: '',
    problemCost: '',
    rootCause: '',
    costOfInaction: '',
    proposal: '',
    proposalOutcome: '',
    detailedProposal: '',
    whyThisApproach: '',
    alternatives: [{ option: '', reason: '' }, { option: '', reason: '' }],
    proofPast: '',
    proofExternal: '',
    evidence: '',
    tested: '',
    externalExamples: '',
    milestones: [{ date: '', milestone: '', criteria: '', owner: '' }],
    budgetBreakdown: [{ item: '', oneTime: '', monthly: '' }],
    budgetRequired: '',
    externalResources: '',
    dependencyList: [],
    blockers: '',
    riskMatrix: [{ risk: '', likelihood: '', impact: '', mitigation: '' }],
    worstCase: '',
    reversible: '',
    exitStrategy: '',
    capacityCheck: '',
    deprioritize: '',
    dependencies: '',
    deliveryPlan: '',
    qualityControl: '',
    missionAlignment: [],
    missionJustification: '',
    risks: [],
    killSwitch: '',
    primaryMetric: '',
    secondaryMetrics: '',
    reviewDate: '',
    roiInvestment: '',
    roiReturn: '',
    paybackPeriod: '',
    reviewSchedule: [],
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
    objections: [],
    salesMechanism: [],
    whoSells: '',
    conversionTarget: '',
  });

  const updateData = (field: keyof InitiativeMemoData, value: any) => {
    setData({ ...data, [field]: value });
  };

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { InitiativeMemoPDF } = await import('@/components/InitiativeMemoPDF');
      const blob = await pdf(<InitiativeMemoPDF data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Initiative-Memo-${data.projectName || 'Draft'}-${data.date}.pdf`;
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
        <div className="inline-block bg-red-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-3">
          Initiative Memo
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Initiative Memo</h1>
        <p className="text-gray-600 mt-1">For major launches, strategic pivots, new hires, significant investments</p>
        <p className="text-gray-500 text-sm mt-1">Requires: Founder sign-off (Bryan & Melvin)</p>
        <p className="text-gray-500 text-sm">Estimated time: 2-4 hours</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); generatePDF(); }} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <FormField label="Initiative Name">
            <TextInput 
              value={data.projectName} 
              onChange={(v) => updateData('projectName', v)} 
              placeholder="Strategic name for this initiative" 
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
          <FormField label="Initiative Type">
            <select 
              value={data.initiativeType} 
              onChange={(e) => updateData('initiativeType', e.target.value)}
              className="form-input"
            >
              <option value="">Select type...</option>
              {initiativeTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </FormField>
        </div>

        {/* Priority Section */}
        <FormSection title="PRIORITY & STRATEGIC ALIGNMENT" color="bg-red-500">
          <FormField label="Priority Level">
            <RadioGroup 
              options={priorityLevels} 
              value={data.priorityLevel} 
              onChange={(v) => updateData('priorityLevel', v)}
              name="priority"
            />
          </FormField>

          <FormField label="Which company priority does this serve?">
            <CheckboxGroup 
              options={companyPriorities} 
              values={data.companyPriority} 
              onChange={(v) => updateData('companyPriority', v)} 
            />
          </FormField>

          <FormField label="Which 2031 phase does this advance?">
            <CheckboxGroup 
              options={phases2031} 
              values={data.phase2031 || []} 
              onChange={(v) => updateData('phase2031', v)} 
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Target Start Date">
              <TextInput 
                value={data.targetLaunchDate} 
                onChange={(v) => updateData('targetLaunchDate', v)} 
                placeholder="When do we start?" 
              />
            </FormField>
            <FormField label="Hard Deadline (if any)">
              <TextInput 
                value={data.hardDeadline} 
                onChange={(v) => updateData('hardDeadline', v)} 
                placeholder="Date and why" 
              />
            </FormField>
          </div>
        </FormSection>

        {/* Team Section */}
        <FormSection title="TEAM & STAKEHOLDER REQUIREMENTS" color="bg-blue-500">
          <FormField label="Core Initiative Team">
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

          <FormField label="Who must APPROVE (and what)?">
            <TextInput 
              value={data.approver} 
              onChange={(v) => updateData('approver', v)} 
              placeholder="e.g., 'Bryan: Budget' 'Melvin: Messaging'" 
            />
          </FormField>

          <FormField label="External Resources Required">
            <TextArea 
              value={data.externalResources} 
              onChange={(v) => updateData('externalResources', v)} 
              placeholder="Contractors, agencies, consultants, tools - with estimated costs"
            />
          </FormField>
        </FormSection>

        {/* Executive Summary */}
        <FormSection title="EXECUTIVE SUMMARY" color="bg-slate-800">
          <p className="text-sm text-gray-600 mb-4 bg-amber-50 p-3 rounded">
            💡 This section should be readable in 2 minutes and give founders enough context to understand the full proposal.
          </p>

          <FormField label="The Opportunity (2-3 sentences)">
            <TextArea 
              value={data.executiveSummaryOpportunity} 
              onChange={(v) => updateData('executiveSummaryOpportunity', v)} 
              placeholder="What's the opportunity and why is it significant?"
            />
          </FormField>

          <FormField label="The Proposal (2-3 sentences)">
            <TextArea 
              value={data.executiveSummaryProposal} 
              onChange={(v) => updateData('executiveSummaryProposal', v)} 
              placeholder="What exactly are you proposing we do?"
            />
          </FormField>

          <FormField label="The Ask (1 sentence)">
            <TextArea 
              value={data.executiveSummaryAsk} 
              onChange={(v) => updateData('executiveSummaryAsk', v)} 
              placeholder="What do you need? Budget? Approval? Resources?"
              rows={2}
            />
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Investment Required">
              <TextInput 
                value={data.investmentRequired} 
                onChange={(v) => updateData('investmentRequired', v)} 
                placeholder="$X total / X hours / X months" 
              />
            </FormField>
            <FormField label="Expected Return">
              <TextInput 
                value={data.expectedReturn} 
                onChange={(v) => updateData('expectedReturn', v)} 
                placeholder="X% ROI / $X revenue / strategic value" 
              />
            </FormField>
          </div>
        </FormSection>

        {/* Part A: Strategic Context */}
        <FormSection title="PART A: STRATEGIC CONTEXT" color="bg-blue-700">
          <FormField label="1. Current State">
            <TextArea 
              value={data.currentState} 
              onChange={(v) => updateData('currentState', v)} 
              placeholder="Where are we now? Be specific with numbers."
            />
          </FormField>

          <FormField label="Market Context">
            <TextArea 
              value={data.marketContext} 
              onChange={(v) => updateData('marketContext', v)} 
              placeholder="What's happening in our industry that makes this relevant?"
            />
          </FormField>

          <FormField label="Competitive Landscape">
            <TextArea 
              value={data.competitiveLandscape} 
              onChange={(v) => updateData('competitiveLandscape', v)} 
              placeholder="What are competitors doing? What gaps exist?"
            />
          </FormField>

          <FormField label="2. What's broken or missing?">
            <TextArea 
              value={data.problem} 
              onChange={(v) => updateData('problem', v)} 
              placeholder="Be specific about the pain point or gap"
            />
          </FormField>

          <FormField label="Root Cause Analysis">
            <TextArea 
              value={data.rootCause} 
              onChange={(v) => updateData('rootCause', v)} 
              placeholder="Why does this problem exist? What's the underlying issue?"
            />
          </FormField>

          <FormField label="Cost of Inaction">
            <TextArea 
              value={data.costOfInaction} 
              onChange={(v) => updateData('costOfInaction', v)} 
              placeholder="What happens if we do nothing? Quantify if possible."
            />
          </FormField>

          <FormField label="3. How does this advance our 2031 mission?">
            <TextArea 
              value={data.proposalOutcome} 
              onChange={(v) => updateData('proposalOutcome', v)} 
              placeholder="Connect specifically to 'world-renowned coaching and marketing education brand'"
            />
          </FormField>
        </FormSection>

        {/* Part B: The Proposal */}
        <FormSection title="PART B: THE PROPOSAL" color="bg-green-700">
          <FormField 
            label="4. What exactly are we doing?"
            note="Be thorough. This is where you lay out the full plan."
          >
            <TextArea 
              value={data.detailedProposal} 
              onChange={(v) => updateData('detailedProposal', v)} 
              placeholder="Detailed description of the initiative - can be multiple paragraphs"
              rows={5}
            />
          </FormField>

          <FormField label="Why this approach?">
            <TextArea 
              value={data.whyThisApproach} 
              onChange={(v) => updateData('whyThisApproach', v)} 
              placeholder="Why is this the best way vs alternatives?"
            />
          </FormField>

          <FormField label="Alternatives Considered">
            <AlternativesList 
              items={data.alternatives || []} 
              onChange={(v) => updateData('alternatives', v)} 
            />
          </FormField>

          <FormField label="5. Evidence this will work">
            <TextArea 
              value={data.evidence} 
              onChange={(v) => updateData('evidence', v)} 
              placeholder="Data, case studies, past results, expert opinions"
            />
          </FormField>

          <FormField label="Has this been tested?">
            <TextArea 
              value={data.tested} 
              onChange={(v) => updateData('tested', v)} 
              placeholder="Any pilot results, small-scale tests, or validation?"
            />
          </FormField>

          <FormField label="Who else has done this successfully?">
            <TextArea 
              value={data.externalExamples} 
              onChange={(v) => updateData('externalExamples', v)} 
              placeholder="External examples and what we can learn from them"
            />
          </FormField>
        </FormSection>

        {/* Part C: Implementation */}
        <FormSection title="PART C: IMPLEMENTATION PLAN" color="bg-orange-700">
          <FormField label="6. Timeline & Milestones">
            <MilestonesList 
              milestones={data.milestones || []} 
              onChange={(v) => updateData('milestones', v)} 
            />
          </FormField>

          <FormField label="7. Budget Breakdown">
            <BudgetList 
              items={data.budgetBreakdown || []} 
              onChange={(v) => updateData('budgetBreakdown', v)} 
            />
          </FormField>

          <FormField label="8. Potential blockers">
            <TextArea 
              value={data.blockers} 
              onChange={(v) => updateData('blockers', v)} 
              placeholder="What could stop this from happening?"
            />
          </FormField>
        </FormSection>

        {/* Part D: Risk */}
        <FormSection title="PART D: RISK ANALYSIS" color="bg-amber-800">
          <FormField label="9. Risk Assessment">
            <RisksList 
              risks={data.riskMatrix || []} 
              onChange={(v) => updateData('riskMatrix', v)}
              showLikelihoodImpact={true}
            />
          </FormField>

          <FormField label="10. Worst Case Scenario">
            <TextArea 
              value={data.worstCase} 
              onChange={(v) => updateData('worstCase', v)} 
              placeholder="If everything goes wrong, what happens? Be honest about the downside."
            />
          </FormField>

          <FormField label="Is this reversible?">
            <RadioGroup 
              options={['Reversible - we can undo this if needed', 'Irreversible - once done, we\'re committed']} 
              value={data.reversible} 
              onChange={(v) => updateData('reversible', v)}
              name="reversible"
            />
          </FormField>

          <FormField label="Exit strategy">
            <TextArea 
              value={data.exitStrategy} 
              onChange={(v) => updateData('exitStrategy', v)} 
              placeholder="If this fails, how do we exit gracefully?"
            />
          </FormField>
        </FormSection>

        {/* Part E: Success & ROI */}
        <FormSection title="PART E: SUCCESS METRICS & ROI" color="bg-purple-700">
          <FormField 
            label="11. Primary Success Metric"
            note="The ONE number that tells us if this worked."
          >
            <TextInput 
              value={data.primaryMetric} 
              onChange={(v) => updateData('primaryMetric', v)} 
              placeholder="Specific, measurable outcome" 
            />
          </FormField>

          <FormField label="Secondary Metrics">
            <TextInput 
              value={data.secondaryMetrics} 
              onChange={(v) => updateData('secondaryMetrics', v)} 
              placeholder="Supporting indicators" 
            />
          </FormField>

          <FormField label="12. Total Investment">
            <TextInput 
              value={data.roiInvestment} 
              onChange={(v) => updateData('roiInvestment', v)} 
              placeholder="$X (one-time) + $X (monthly x duration)" 
            />
          </FormField>

          <FormField label="Expected Return">
            <TextInput 
              value={data.roiReturn} 
              onChange={(v) => updateData('roiReturn', v)} 
              placeholder="$X revenue / $X saved / strategic value" 
            />
          </FormField>

          <FormField label="Payback Period">
            <TextInput 
              value={data.paybackPeriod} 
              onChange={(v) => updateData('paybackPeriod', v)} 
              placeholder="X months to recoup investment" 
            />
          </FormField>
        </FormSection>

        {/* Submit */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={generating}
            className="w-full bg-red-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Initiative Memo PDF
              </>
            )}
          </button>
          <p className="text-center text-gray-500 text-sm mt-3">
            PDF will be downloaded for you to share with Bryan & Melvin for approval
          </p>
        </div>
      </form>
    </div>
  );
}
