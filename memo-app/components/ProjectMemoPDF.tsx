import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ProjectMemoData, TeamMember } from '@/lib/memoTypes';

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
      <Text style={[styles.tableCellHeader, { width: '22%' }]}>Person</Text>
      <Text style={[styles.tableCellHeader, { width: '28%' }]}>Role</Text>
      <Text style={[styles.tableCellHeader, { width: '15%' }]}>Hours</Text>
      <Text style={[styles.tableCellHeader, { width: '15%' }]}>When</Text>
      <Text style={[styles.tableCellHeader, { width: '20%' }]}>Confirmed</Text>
    </View>
    {members.map((member, idx) => (
      <View key={idx} style={styles.tableRow}>
        <Text style={[styles.tableCell, { width: '22%' }]}>{member.person || '-'}</Text>
        <Text style={[styles.tableCell, { width: '28%' }]}>{member.role || '-'}</Text>
        <Text style={[styles.tableCell, { width: '15%' }]}>{member.hours || '-'}</Text>
        <Text style={[styles.tableCell, { width: '15%' }]}>{member.when || '-'}</Text>
        <Text style={[styles.tableCell, { width: '20%' }]}>{member.confirmed ? 'Yes' : 'No'}</Text>
      </View>
    ))}
  </View>
);

const RACITable = ({ data }: { data: ProjectMemoData }) => (
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
  </View>
);

export const ProjectMemoPDF = ({ data }: { data: ProjectMemoData }) => (
  <Document>
    {/* Page 1: Header, Priority, Team */}
    <Page size="LETTER" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.brandName}>MARKET LEADERS</Text>
        <Text style={styles.title}>PROJECT MEMO</Text>
        <Text style={styles.subtitle}>For: Campaigns, new offers, system builds, content series</Text>
        <Text style={styles.subtitle}>Time to complete: 30-60 minutes</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Project Name:</Text>
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
        <Text style={styles.infoLabel}>Project Type:</Text>
        <Text style={styles.infoValue}>{data.projectType}</Text>
      </View>

      <View style={styles.separator} />

      <View style={[styles.sectionHeader, { backgroundColor: '#e53e3e' }]}>
        <Text>PRIORITY & TIMELINE</Text>
      </View>

      <Text style={styles.label}>Priority Level: {data.priorityLevel}</Text>
      
      <Text style={styles.label}>Company Priority:</Text>
      {data.companyPriority.map((p, i) => (
        <Text key={i} style={styles.bullet}>• {p}</Text>
      ))}

      <Text style={styles.label}>Target Launch Date:</Text>
      <Text style={styles.value}>{data.targetLaunchDate}</Text>

      <Text style={styles.label}>Hard Deadline:</Text>
      <Text style={styles.value}>{data.hardDeadline}</Text>

      <View style={[styles.sectionHeader, { backgroundColor: '#3182ce' }]}>
        <Text>TEAM REQUIREMENTS</Text>
      </View>

      <Text style={styles.label}>Project Team:</Text>
      <TeamTable members={data.teamMembers} />

      <Text style={styles.label}>RACI Matrix:</Text>
      <RACITable data={data} />

      <Text style={styles.label}>Who must APPROVE:</Text>
      <Text style={styles.value}>{data.approver}</Text>
    </Page>

    {/* Page 2: The Core */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#1a365d' }]}>
        <Text>PART A: THE CORE</Text>
      </View>

      <Text style={styles.subHeader}>1. THE PROBLEM</Text>
      <Text style={styles.label}>What specific problem are we solving?</Text>
      <Text style={styles.value}>{data.problem}</Text>
      <Text style={styles.label}>What's the cost of NOT solving this?</Text>
      <Text style={styles.value}>{data.problemCost}</Text>

      <Text style={styles.subHeader}>2. THE PROPOSAL</Text>
      <Text style={styles.label}>What exactly are we doing?</Text>
      <Text style={styles.value}>{data.proposal}</Text>
      <Text style={styles.label}>What's the specific outcome?</Text>
      <Text style={styles.value}>{data.proposalOutcome}</Text>

      <Text style={styles.subHeader}>3. WHY THIS WILL WORK</Text>
      <Text style={styles.label}>Past results:</Text>
      <Text style={styles.value}>{data.proofPast}</Text>
      <Text style={styles.label}>External validation:</Text>
      <Text style={styles.value}>{data.proofExternal}</Text>
    </Page>

    {/* Page 3: Marketing */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#2c5282' }]}>
        <Text>PART B: MARKETING & TRAFFIC</Text>
      </View>

      <Text style={styles.subHeader}>4. TARGET AUDIENCE</Text>
      <Text style={styles.label}>Who specifically is this for?</Text>
      <Text style={styles.value}>{data.targetAudience}</Text>
      <Text style={styles.label}>Avatars:</Text>
      {data.avatars.map((a, i) => (
        <Text key={i} style={styles.bullet}>• {a}</Text>
      ))}

      <Text style={styles.subHeader}>5. PROMOTION PLAN</Text>
      <Text style={styles.label}>Channels:</Text>
      {data.promotionChannels.map((c, i) => (
        <Text key={i} style={styles.bullet}>• {c}</Text>
      ))}
      <Text style={styles.label}>Content pieces needed:</Text>
      <Text style={styles.value}>{data.contentNeeded}</Text>
      <Text style={styles.label}>Pre-frame strategy:</Text>
      <Text style={styles.value}>{data.preFrameStrategy}</Text>

      <Text style={styles.subHeader}>6. TRAFFIC NUMBERS</Text>
      <Text style={styles.label}>How many leads/eyeballs needed:</Text>
      <Text style={styles.value}>{data.trafficNeeded}</Text>
      <Text style={styles.label}>Current reach:</Text>
      <Text style={styles.value}>{data.currentReach}</Text>
    </Page>

    {/* Page 4: Sales */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#276749' }]}>
        <Text>PART C: SALES & CONVERSION</Text>
      </View>

      <Text style={styles.subHeader}>7. THE OFFER</Text>
      <Text style={styles.label}>What are we selling?</Text>
      <Text style={styles.value}>{data.offerDescription}</Text>
      <Text style={styles.label}>Price point:</Text>
      <Text style={styles.value}>{data.pricePoint}</Text>
      <Text style={styles.label}>Offer name:</Text>
      <Text style={styles.value}>{data.offerName}</Text>

      <Text style={styles.subHeader}>8. VALUE PROPOSITION</Text>
      <Text style={styles.label}>Why buy NOW:</Text>
      <Text style={styles.value}>{data.whyBuyNow}</Text>
      <Text style={styles.label}>Objections & Responses:</Text>
      {data.objections.map((obj, i) => (
        <View key={i} style={{ marginBottom: 8 }}>
          <Text style={styles.bullet}>• Objection: {obj.objection}</Text>
          <Text style={[styles.bullet, { marginLeft: 20 }]}>Response: {obj.response}</Text>
        </View>
      ))}

      <Text style={styles.subHeader}>9. SALES MECHANISM</Text>
      <Text style={styles.label}>How will people buy:</Text>
      {data.salesMechanism.map((s, i) => (
        <Text key={i} style={styles.bullet}>• {s}</Text>
      ))}
      <Text style={styles.label}>Who's selling:</Text>
      <Text style={styles.value}>{data.whoSells}</Text>
      <Text style={styles.label}>Conversion target:</Text>
      <Text style={styles.value}>{data.conversionTarget}</Text>
    </Page>

    {/* Page 5: Operations */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#9c4221' }]}>
        <Text>PART D: OPERATIONS CHECK</Text>
      </View>

      <Text style={styles.subHeader}>10. RESOURCE REQUIREMENTS</Text>
      <Text style={styles.label}>Budget required:</Text>
      <Text style={styles.value}>{data.budgetRequired}</Text>
      <Text style={styles.label}>External resources:</Text>
      <Text style={styles.value}>{data.externalResources}</Text>

      <Text style={styles.subHeader}>11. CAPACITY CHECK</Text>
      <Text style={styles.label}>Do we have capacity?</Text>
      <Text style={styles.value}>{data.capacityCheck}</Text>
      <Text style={styles.label}>What gets deprioritized:</Text>
      <Text style={styles.value}>{data.deprioritize}</Text>
      <Text style={styles.label}>Dependencies/blockers:</Text>
      <Text style={styles.value}>{data.dependencies}</Text>

      <Text style={styles.subHeader}>12. DELIVERY</Text>
      <Text style={styles.label}>Can we deliver?</Text>
      <Text style={styles.value}>{data.deliveryPlan}</Text>
      <Text style={styles.label}>Quality control:</Text>
      <Text style={styles.value}>{data.qualityControl}</Text>
    </Page>

    {/* Page 6: Decision */}
    <Page size="LETTER" style={styles.page}>
      <View style={[styles.sectionHeader, { backgroundColor: '#553c9a' }]}>
        <Text>PART E: DECISION TIME</Text>
      </View>

      <Text style={styles.subHeader}>13. MISSION ALIGNMENT</Text>
      {data.missionAlignment.map((m, i) => (
        <Checkbox key={i} checked={true} label={m} />
      ))}
      {data.missionJustification && (
        <>
          <Text style={styles.label}>Justification:</Text>
          <Text style={styles.value}>{data.missionJustification}</Text>
        </>
      )}

      <Text style={styles.subHeader}>14. RISKS</Text>
      {data.risks.map((r, i) => (
        <View key={i} style={{ marginBottom: 8 }}>
          <Text style={styles.bullet}>• Risk: {r.risk}</Text>
          <Text style={[styles.bullet, { marginLeft: 20 }]}>Mitigation: {r.mitigation}</Text>
        </View>
      ))}
      <Text style={styles.label}>Kill switch:</Text>
      <Text style={styles.value}>{data.killSwitch}</Text>

      <Text style={styles.subHeader}>15. SUCCESS METRICS</Text>
      <Text style={styles.label}>Primary metric:</Text>
      <Text style={styles.value}>{data.primaryMetric}</Text>
      <Text style={styles.label}>Secondary metrics:</Text>
      <Text style={styles.value}>{data.secondaryMetrics}</Text>
      <Text style={styles.label}>Review date:</Text>
      <Text style={styles.value}>{data.reviewDate}</Text>

      <View style={styles.separator} />

      <View style={[styles.sectionHeader, { backgroundColor: '#1a365d' }]}>
        <Text>TEAM DECISION</Text>
      </View>
      
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 10 }}>
        <Checkbox checked={false} label="APPROVED" />
        <Checkbox checked={false} label="REVISE & RESUBMIT" />
        <Checkbox checked={false} label="NOT NOW" />
        <Checkbox checked={false} label="REJECTED" />
      </View>

      <Text style={styles.label}>Discussion Notes:</Text>
      <Text style={styles.value}>_________________________________________________</Text>
      
      <Text style={styles.label}>Modifications Required:</Text>
      <Text style={styles.value}>_________________________________________________</Text>

      <Text style={styles.label}>Project Owner (Accountable):</Text>
      <Text style={styles.value}>_________________________________________________</Text>
    </Page>
  </Document>
);
