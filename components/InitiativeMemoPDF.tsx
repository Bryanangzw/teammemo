import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { InitiativeMemoData, TeamMember } from '@/lib/memoTypes';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
  },
  brandName: {
    fontSize: 10,
    color: '#666666',
    letterSpacing: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 10,
    color: '#666666',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    marginVertical: 15,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoLabel: {
    width: 120,
    fontWeight: 'bold',
  },
  infoValue: {
    flex: 1,
    color: '#333333',
  },
  sectionHeader: {
    color: '#FFFFFF',
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  value: {
    color: '#333333',
    marginBottom: 10,
    lineHeight: 1.4,
  },
  note: {
    backgroundColor: '#fff3cd',
    padding: 8,
    marginBottom: 10,
    fontSize: 10,
    fontStyle: 'italic',
    color: '#856404',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxBox: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#333',
    marginRight: 8,
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#333',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 8,
  },
  table: {
    marginTop: 10,
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f7fafc',
    borderWidth: 1,
    borderColor: '#CCCCCC',
  },
  tableRow: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
  },
  tableCell: {
    padding: 6,
    fontSize: 10,
  },
  tableCellHeader: {
    padding: 6,
    fontSize: 10,
    fontWeight: 'bold',
  },
  raciRow: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginBottom: -1,
  },
  raciLabel: {
    width: 100,
    padding: 8,
    fontWeight: 'bold',
    fontSize: 10,
  },
  raciValue: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#CCCCCC',
  },
  bullet: {
    marginLeft: 10,
    marginBottom: 3,
  },
});

const Checkbox = ({ checked, label }: { checked: boolean; label: string }) => (
  <View style={styles.checkbox}>
    <View style={checked ? styles.checkboxChecked : styles.checkboxBox}>
      {checked && <Text style={styles.checkmark}>✓</Text>}
    </View>
    <Text>{label}</Text>
  </View>
);

const TeamTable = ({ members }: { members: TeamMember[] }) => (
  <View style={styles.table}>
    <View style={styles.tableHeader}>
      <Text style={[styles.tableCellHeader, { width: '20%' }]}>Person</Text>
      <Text style={[styles.tableCellHeader, { width: '25%' }]}>Role</Text>
      <Text style={[styles.tableCellHeader, { width: '15%' }]}>Hrs/Wk</Text>
      <Text style={[styles.tableCellHeader, { width: '15%' }]}>Duration</Text>
      <Text style={[styles.tableCellHeader, { width: '25%' }]}>Confirmed</Text>
    </View>
    {members.map((member, idx) => (
      <View key={idx} style={styles.tableRow}>
        <Text style={[styles.tableCell, { width: '20%' }]}>{member.person || '-'}</Text>
        <Text style={[styles.tableCell, { width: '25%' }]}>{member.role || '-'}</Text>
        <Text style={[styles.tableCell, { width: '15%' }]}>{member.hours || '-'}</Text>
        <Text style={[styles.tableCell, { width: '15%' }]}>{member.when || '-'}</Text>
        <Text style={[styles.tableCell, { width: '25%' }]}>{member.confirmed ? 'Yes' : 'No'}</Text>
      </View>
    ))}
  </View>
);

const RACITable = ({ data }: { data: InitiativeMemoData }) => (
  <View style={styles.table}>
    <View style={[styles.raciRow, { backgroundColor: '#c6f6d5' }]}>
      <Text style={styles.raciLabel}>RESPONSIBLE</Text>
      <Text style={styles.raciValue}>{data.responsible || '-'}</Text>
    </View>
    <View style={[styles.raciRow, { backgroundColor: '#bee3f8' }]}>
      <Text style={styles.raciLabel}>ACCOUNTABLE</Text>
      <Text style={styles.raciValue}>{data.accountable || '-'}</Text>
    </View>
    <View style={[styles.raciRow, { backgroundColor: '#faf089' }]}>
      <Text style={styles.raciLabel}>CONSULTED</Text>
      <Text style={styles.raciValue}>{data.consulted || '-'}</Text>
    </View>
    <View style={[styles.raciRow, { backgroundColor: '#e9d8fd' }]}>
      <Text style={styles.raciLabel}>INFORMED</Text>
      <Text style={styles.raciValue}>{data.informed || '-'}</Text>
    </View>
    <View style={[styles.raciRow, { backgroundColor: '#fed7d7' }]}>
      <Text style={styles.raciLabel}>APPROVERS</Text>
      <Text style={styles.raciValue}>{data.approver || '-'}</Text>
    </View>
  </View>
);

export const InitiativeMemoPDF = ({ data }: { data: InitiativeMemoData }) => (
  <Document>
    {/* Page 1: Header & Priority */}
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.brandName}>MARKET LEADERS</Text>
        <Text style={styles.title}>INITIATIVE MEMO</Text>
        <Text style={styles.subtitle}>For: Major launches, strategic pivots, new hires, significant investments</Text>
        <Text style={styles.subtitle}>Requires: Founder sign-off (Bryan & Melvin)</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Initiative Name:</Text>
        <Text style={styles.infoValue}>{data.projectName}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Submitted by:</Text>
        <Text style={styles.infoValue}>{data.submittedBy}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Date:</Text>
        <Text style={styles.infoValue}>{data.date}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Type:</Text>
        <Text style={styles.infoValue}>{data.initiativeType}</Text>
      </View>

      <View style={[styles.sectionHeader, { backgroundColor: '#e53e3e' }]}>
        <Text>PRIORITY & STRATEGIC ALIGNMENT</Text>
      </View>

      <Text style={styles.label}>Priority Level: {data.priorityLevel}</Text>

      <Text style={styles.label}>Company Priority:</Text>
      {data.companyPriority.map((p, i) => (
        <Text key={i} style={styles.bullet}>• {p}</Text>
      ))}

      <Text style={styles.label}>2031 Phase:</Text>
      {data.phase2031?.map((p, i) => (
        <Text key={i} style={styles.bullet}>• {p}</Text>
      ))}

      <Text style={styles.label}>Target Start Date:</Text>
      <Text style={styles.value}>{data.targetLaunchDate}</Text>

      <Text style={styles.label}>Hard Deadline:</Text>
      <Text style={styles.value}>{data.hardDeadline}</Text>
    </Page>

    {/* Page 2: Team */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#3182ce' }]}>
        <Text>TEAM & STAKEHOLDER REQUIREMENTS</Text>
      </View>

      <Text style={styles.label}>Core Initiative Team:</Text>
      <TeamTable members={data.teamMembers} />

      <Text style={styles.label}>RACI Matrix:</Text>
      <RACITable data={data} />

      <Text style={styles.label}>External Resources Required:</Text>
      <Text style={styles.value}>{data.externalResources}</Text>
    </Page>

    {/* Page 3: Executive Summary */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#1a365d' }]}>
        <Text>EXECUTIVE SUMMARY</Text>
      </View>

      <View style={styles.note}>
        <Text>This section should be readable in 2 minutes and give founders enough context.</Text>
      </View>

      <Text style={styles.label}>The Opportunity:</Text>
      <Text style={styles.value}>{data.executiveSummaryOpportunity}</Text>

      <Text style={styles.label}>The Proposal:</Text>
      <Text style={styles.value}>{data.executiveSummaryProposal}</Text>

      <Text style={styles.label}>The Ask:</Text>
      <Text style={styles.value}>{data.executiveSummaryAsk}</Text>

      <Text style={styles.label}>Investment Required:</Text>
      <Text style={styles.value}>{data.investmentRequired}</Text>

      <Text style={styles.label}>Expected Return:</Text>
      <Text style={styles.value}>{data.expectedReturn}</Text>
    </Page>

    {/* Page 4: Strategic Context */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#2c5282' }]}>
        <Text>PART A: STRATEGIC CONTEXT</Text>
      </View>

      <Text style={styles.subHeader}>1. SITUATION ANALYSIS</Text>
      <Text style={styles.label}>Current State:</Text>
      <Text style={styles.value}>{data.currentState}</Text>
      <Text style={styles.label}>Market Context:</Text>
      <Text style={styles.value}>{data.marketContext}</Text>
      <Text style={styles.label}>Competitive Landscape:</Text>
      <Text style={styles.value}>{data.competitiveLandscape}</Text>

      <Text style={styles.subHeader}>2. THE PROBLEM/OPPORTUNITY</Text>
      <Text style={styles.label}>What's broken or missing?</Text>
      <Text style={styles.value}>{data.problem}</Text>
      <Text style={styles.label}>Root Cause:</Text>
      <Text style={styles.value}>{data.rootCause}</Text>
      <Text style={styles.label}>Cost of Inaction:</Text>
      <Text style={styles.value}>{data.costOfInaction}</Text>

      <Text style={styles.subHeader}>3. MISSION ALIGNMENT</Text>
      <Text style={styles.value}>{data.proposalOutcome}</Text>
    </Page>

    {/* Page 5: The Proposal */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#276749' }]}>
        <Text>PART B: THE PROPOSAL</Text>
      </View>

      <Text style={styles.subHeader}>4. DETAILED PROPOSAL</Text>
      <Text style={styles.label}>What exactly are we doing?</Text>
      <Text style={styles.value}>{data.detailedProposal}</Text>
      <Text style={styles.label}>Why this approach?</Text>
      <Text style={styles.value}>{data.whyThisApproach}</Text>

      <Text style={styles.label}>Alternatives Considered:</Text>
      {data.alternatives?.map((alt, i) => (
        <View key={i} style={{ marginBottom: 8 }}>
          <Text style={styles.bullet}>• {alt.option}</Text>
          <Text style={[styles.bullet, { marginLeft: 20 }]}>{alt.reason}</Text>
        </View>
      ))}

      <Text style={styles.subHeader}>5. PROOF & VALIDATION</Text>
      <Text style={styles.label}>Evidence this will work:</Text>
      <Text style={styles.value}>{data.evidence}</Text>
      <Text style={styles.label}>Has this been tested?</Text>
      <Text style={styles.value}>{data.tested}</Text>
      <Text style={styles.label}>External examples:</Text>
      <Text style={styles.value}>{data.externalExamples}</Text>
    </Page>

    {/* Page 6: Implementation */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#9c4221' }]}>
        <Text>PART C: IMPLEMENTATION PLAN</Text>
      </View>

      <Text style={styles.subHeader}>6. TIMELINE & MILESTONES</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCellHeader, { width: '20%' }]}>Date</Text>
          <Text style={[styles.tableCellHeader, { width: '35%' }]}>Milestone</Text>
          <Text style={[styles.tableCellHeader, { width: '25%' }]}>Criteria</Text>
          <Text style={[styles.tableCellHeader, { width: '20%' }]}>Owner</Text>
        </View>
        {data.milestones?.map((m, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '20%' }]}>{m.date}</Text>
            <Text style={[styles.tableCell, { width: '35%' }]}>{m.milestone}</Text>
            <Text style={[styles.tableCell, { width: '25%' }]}>{m.criteria}</Text>
            <Text style={[styles.tableCell, { width: '20%' }]}>{m.owner}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subHeader}>7. BUDGET BREAKDOWN</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCellHeader, { width: '50%' }]}>Item</Text>
          <Text style={[styles.tableCellHeader, { width: '25%' }]}>One-Time</Text>
          <Text style={[styles.tableCellHeader, { width: '25%' }]}>Monthly</Text>
        </View>
        {data.budgetBreakdown?.map((b, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '50%' }]}>{b.item}</Text>
            <Text style={[styles.tableCell, { width: '25%' }]}>{b.oneTime}</Text>
            <Text style={[styles.tableCell, { width: '25%' }]}>{b.monthly}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subHeader}>8. DEPENDENCIES</Text>
      <Text style={styles.value}>{data.blockers}</Text>
    </Page>

    {/* Page 7: Risk & ROI */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#744210' }]}>
        <Text>PART D: RISK ANALYSIS</Text>
      </View>

      <Text style={styles.subHeader}>9. RISK ASSESSMENT</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCellHeader, { width: '30%' }]}>Risk</Text>
          <Text style={[styles.tableCellHeader, { width: '15%' }]}>Likelihood</Text>
          <Text style={[styles.tableCellHeader, { width: '15%' }]}>Impact</Text>
          <Text style={[styles.tableCellHeader, { width: '40%' }]}>Mitigation</Text>
        </View>
        {data.riskMatrix?.map((r, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={[styles.tableCell, { width: '30%' }]}>{r.risk}</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{r.likelihood}</Text>
            <Text style={[styles.tableCell, { width: '15%' }]}>{r.impact}</Text>
            <Text style={[styles.tableCell, { width: '40%' }]}>{r.mitigation}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.subHeader}>10. WORST CASE</Text>
      <Text style={styles.label}>If everything goes wrong:</Text>
      <Text style={styles.value}>{data.worstCase}</Text>
      <Text style={styles.label}>Reversible?</Text>
      <Text style={styles.value}>{data.reversible}</Text>
      <Text style={styles.label}>Exit strategy:</Text>
      <Text style={styles.value}>{data.exitStrategy}</Text>

      <View style={[styles.sectionHeader, { backgroundColor: '#553c9a' }]}>
        <Text>PART E: SUCCESS METRICS & ROI</Text>
      </View>

      <Text style={styles.label}>Primary Metric:</Text>
      <Text style={styles.value}>{data.primaryMetric}</Text>
      <Text style={styles.label}>Total Investment:</Text>
      <Text style={styles.value}>{data.roiInvestment}</Text>
      <Text style={styles.label}>Expected Return:</Text>
      <Text style={styles.value}>{data.roiReturn}</Text>
      <Text style={styles.label}>Payback Period:</Text>
      <Text style={styles.value}>{data.paybackPeriod}</Text>
    </Page>

    {/* Page 8: Decision */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#1a365d' }]}>
        <Text>FOUNDER DECISION</Text>
      </View>

      <Text style={styles.label}>Bryan's Assessment:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
        <Checkbox checked={false} label="Approved" />
        <Checkbox checked={false} label="Approved with modifications" />
        <Checkbox checked={false} label="Need more information" />
        <Checkbox checked={false} label="Not now" />
        <Checkbox checked={false} label="Rejected" />
      </View>
      <Text style={styles.value}>Notes: _________________________________</Text>

      <Text style={styles.label}>Melvin's Assessment:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 10 }}>
        <Checkbox checked={false} label="Approved" />
        <Checkbox checked={false} label="Approved with modifications" />
        <Checkbox checked={false} label="Need more information" />
        <Checkbox checked={false} label="Not now" />
        <Checkbox checked={false} label="Rejected" />
      </View>
      <Text style={styles.value}>Notes: _________________________________</Text>

      <View style={styles.separator} />

      <Text style={styles.label}>Final Decision:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 10 }}>
        <Checkbox checked={false} label="APPROVED" />
        <Checkbox checked={false} label="CONDITIONAL" />
        <Checkbox checked={false} label="REJECTED" />
      </View>

      <Text style={styles.label}>Conditions / Modifications:</Text>
      <Text style={styles.value}>_________________________________________________</Text>

      <Text style={styles.label}>Initiative Owner (Accountable):</Text>
      <Text style={styles.value}>_________________________________________________</Text>

      <Text style={styles.label}>Immediate Next Steps:</Text>
      <Text style={styles.value}>1. _____________________________________________</Text>
      <Text style={styles.value}>2. _____________________________________________</Text>
      <Text style={styles.value}>3. _____________________________________________</Text>
    </Page>
  </Document>
);
