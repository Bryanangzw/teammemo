'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { QuickMemoData, priorityLevels, companyPriorities, missionAlignmentOptions } from '@/lib/memoTypes';
import { 
  FormSection, FormField, TextInput, TextArea, 
  RadioGroup, CheckboxGroup, TeamMemberTable 
} from '@/components/FormComponents';

export default function QuickMemoPage() {
  const router = useRouter();
  const [generating, setGenerating] = useState(false);
  
  const [data, setData] = useState<QuickMemoData>({
    submittedBy: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    priorityLevel: '',
    companyPriority: [],
    deadline: '',
    teamMembers: [{ person: '', role: '', hours: '', when: '', confirmed: false }],
    approver: '',
    informed: '',
    idea: '',
    whyNowTrigger: '',
    whyNowCost: '',
    expectedOutcome: '',
    successMetric: '',
    budget: '',
    toolsNeeded: '',
    missionAlignment: '',
  });

  const updateData = (field: keyof QuickMemoData, value: any) => {
    setData({ ...data, [field]: value });
  };

  const generatePDF = async () => {
    setGenerating(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { QuickMemoPDF } = await import('@/components/QuickMemoPDF');
      const blob = await pdf(<QuickMemoPDF data={data} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Quick-Memo-${data.submittedBy || 'Draft'}-${data.date}.pdf`;
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
        <div className="inline-block bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-3">
          Quick Memo
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Quick Memo</h1>
        <p className="text-gray-600 mt-1">For small tests, content ideas, minor improvements</p>
        <p className="text-gray-500 text-sm mt-1">Estimated time: 15 minutes</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); generatePDF(); }} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
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
          <FormField label="Category">
            <select 
              value={data.category} 
              onChange={(e) => updateData('category', e.target.value)}
              className="form-input"
            >
              <option value="">Select category...</option>
              <option value="Content">Content</option>
              <option value="Process">Process</option>
              <option value="Tool">Tool</option>
              <option value="Other">Other</option>
            </select>
          </FormField>
        </div>

        {/* Priority Section */}
        <FormSection title="PRIORITY & ALIGNMENT" color="bg-red-500">
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
              options={companyPriorities.slice(0, 4)} 
              values={data.companyPriority} 
              onChange={(v) => updateData('companyPriority', v)} 
            />
          </FormField>

          <FormField label="Deadline / Timeline">
            <TextInput 
              value={data.deadline} 
              onChange={(v) => updateData('deadline', v)} 
              placeholder="When does this need to be done? Is there urgency?" 
            />
          </FormField>
        </FormSection>

        {/* Team Section */}
        <FormSection title="TEAM REQUIREMENTS" color="bg-blue-500">
          <FormField label="Who needs to be involved?">
            <TeamMemberTable 
              members={data.teamMembers} 
              onChange={(v) => updateData('teamMembers', v)} 
            />
          </FormField>

          <FormField label="Who needs to approve this?">
            <TextInput 
              value={data.approver} 
              onChange={(v) => updateData('approver', v)} 
              placeholder="Name(s) or 'Team discussion'" 
            />
          </FormField>

          <FormField label="Who should be informed when this launches?">
            <TextInput 
              value={data.informed} 
              onChange={(v) => updateData('informed', v)} 
              placeholder="Names of people who should know" 
            />
          </FormField>
        </FormSection>

        {/* The Idea */}
        <FormSection title="1. THE IDEA" color="bg-gray-700">
          <FormField 
            label="What's your idea? (One sentence)"
            note="If you can't explain it in one sentence, it's not clear enough yet."
          >
            <TextArea 
              value={data.idea} 
              onChange={(v) => updateData('idea', v)} 
              placeholder="Describe your idea in one clear sentence"
              rows={2}
            />
          </FormField>
        </FormSection>

        {/* Why Now */}
        <FormSection title="2. WHY NOW?" color="bg-gray-700">
          <FormField label="What triggered this idea?">
            <TextArea 
              value={data.whyNowTrigger} 
              onChange={(v) => updateData('whyNowTrigger', v)} 
              placeholder="What happened that made you think of this?"
              rows={2}
            />
          </FormField>

          <FormField label="What's the cost of NOT doing this?">
            <TextArea 
              value={data.whyNowCost} 
              onChange={(v) => updateData('whyNowCost', v)} 
              placeholder="If we don't act, what do we lose?"
              rows={2}
            />
          </FormField>
        </FormSection>

        {/* Expected Outcome */}
        <FormSection title="3. EXPECTED OUTCOME" color="bg-gray-700">
          <FormField label="If this works, what happens?">
            <TextArea 
              value={data.expectedOutcome} 
              onChange={(v) => updateData('expectedOutcome', v)} 
              placeholder="Specific result - be measurable if possible"
              rows={2}
            />
          </FormField>

          <FormField label="How will we know it worked?">
            <TextArea 
              value={data.successMetric} 
              onChange={(v) => updateData('successMetric', v)} 
              placeholder="What metric or feedback tells us success?"
              rows={2}
            />
          </FormField>
        </FormSection>

        {/* Resources */}
        <FormSection title="4. RESOURCES NEEDED" color="bg-gray-700">
          <FormField label="Budget (if any)">
            <TextInput 
              value={data.budget} 
              onChange={(v) => updateData('budget', v)} 
              placeholder="$0 / $X - specify" 
            />
          </FormField>

          <FormField label="Tools / Access needed">
            <TextInput 
              value={data.toolsNeeded} 
              onChange={(v) => updateData('toolsNeeded', v)} 
              placeholder="Any software, accounts, or access required" 
            />
          </FormField>
        </FormSection>

        {/* Mission Alignment */}
        <FormSection title="5. MISSION ALIGNMENT" color="bg-gray-700">
          <FormField label="Does this align with our 2031 mission?">
            <RadioGroup 
              options={missionAlignmentOptions} 
              value={data.missionAlignment} 
              onChange={(v) => updateData('missionAlignment', v)}
              name="mission"
            />
          </FormField>
        </FormSection>

        {/* Submit */}
        <div className="pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={generating}
            className="w-full bg-green-500 text-white font-bold py-4 px-6 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                Download Quick Memo PDF
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
