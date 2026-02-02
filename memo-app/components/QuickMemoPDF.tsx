import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { QuickMemoData, TeamMember } from '@/lib/memoTypes';

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
    backgroundColor: '#e53e3e',
    color: '#FFFFFF',
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 15,
    marginBottom: 10,
  },
  sectionHeaderBlue: {
    backgroundColor: '#3182ce',
    color: '#FFFFFF',
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 15,
    marginBottom: 10,
  },
  sectionHeaderNavy: {
    backgroundColor: '#1a365d',
    color: '#FFFFFF',
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 15,
    marginBottom: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#333',
    marginRight: 8,
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
  decisionBox: {
    backgroundColor: '#e8f4f8',
    padding: 15,
    marginTop: 15,
  },
  decisionOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
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
      <Text style={[styles.tableCellHeader, { width: '25%' }]}>Person</Text>
      <Text style={[styles.tableCellHeader, { width: '30%' }]}>Role</Text>
      <Text style={[styles.tableCellHeader, { width: '20%' }]}>Hours</Text>
      <Text style={[styles.tableCellHeader, { width: '25%' }]}>Confirmed</Text>
    </View>
    {members.map((member, idx) => (
      <View key={idx} style={styles.tableRow}>
        <Text style={[styles.tableCell, { width: '25%' }]}>{member.person || '-'}</Text>
        <Text style={[styles.tableCell, { width: '30%' }]}>{member.role || '-'}</Text>
        <Text style={[styles.tableCell, { width: '20%' }]}>{member.hours || '-'}</Text>
        <Text style={[styles.tableCell, { width: '25%' }]}>{member.confirmed ? 'Yes' : 'No'}</Text>
      </View>
    ))}
  </View>
);

export const QuickMemoPDF = ({ data }: { data: QuickMemoData }) => (
  <Document>
    <Page size="LETTER" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandName}>MARKET LEADERS</Text>
        <Text style={styles.title}>QUICK MEMO</Text>
        <Text style={styles.subtitle}>For: Small tests, content ideas, minor improvements</Text>
        <Text style={styles.subtitle}>Time to complete: 15 minutes</Text>
      </View>

      <View style={styles.separator} />

      {/* Basic Info */}
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Submitted by:</Text>
        <Text style={styles.infoValue}>{data.submittedBy}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Date:</Text>
        <Text style={styles.infoValue}>{data.date}</Text>
      </View>
      <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>Category:</Text>
        <Text style={styles.infoValue}>{data.category}</Text>
      </View>

      <View style={styles.separator} />

      {/* Priority Section */}
      <View style={styles.sectionHeader}>
        <Text>PRIORITY & ALIGNMENT</Text>
      </View>

      <Text style={styles.label}>Priority Level:</Text>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15 }}>
        {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((level) => (
          <Checkbox key={level} checked={data.priorityLevel === level} label={level} />
        ))}
      </View>

      <Text style={styles.label}>Company Priority:</Text>
      {data.companyPriority.map((priority, idx) => (
        <Text key={idx} style={styles.value}>• {priority}</Text>
      ))}

      <Text style={styles.label}>Deadline / Timeline:</Text>
      <Text style={styles.value}>{data.deadline}</Text>

      {/* Team Requirements */}
      <View style={styles.sectionHeaderBlue}>
        <Text>TEAM REQUIREMENTS</Text>
      </View>

      <Text style={styles.label}>Who needs to be involved?</Text>
      <TeamTable members={data.teamMembers} />

      <Text style={styles.label}>Who needs to approve this?</Text>
      <Text style={styles.value}>{data.approver}</Text>

      <Text style={styles.label}>Who should be informed?</Text>
      <Text style={styles.value}>{data.informed}</Text>

      <View style={styles.separator} />

      {/* The Idea */}
      <Text style={styles.subHeader}>1. THE IDEA (One Sentence)</Text>
      <View style={styles.note}>
        <Text>💡 If you can't explain it in one sentence, it's not clear enough yet.</Text>
      </View>
      <Text style={styles.value}>{data.idea}</Text>

      {/* Why Now */}
      <Text style={styles.subHeader}>2. WHY NOW?</Text>
      <Text style={styles.label}>What triggered this idea?</Text>
      <Text style={styles.value}>{data.whyNowTrigger}</Text>
      <Text style={styles.label}>What's the cost of NOT doing this?</Text>
      <Text style={styles.value}>{data.whyNowCost}</Text>

      {/* Expected Outcome */}
      <Text style={styles.subHeader}>3. EXPECTED OUTCOME</Text>
      <Text style={styles.label}>If this works, what happens?</Text>
      <Text style={styles.value}>{data.expectedOutcome}</Text>
      <Text style={styles.label}>How will we know it worked?</Text>
      <Text style={styles.value}>{data.successMetric}</Text>

      {/* Resources */}
      <Text style={styles.subHeader}>4. RESOURCES NEEDED</Text>
      <Text style={styles.label}>Budget (if any):</Text>
      <Text style={styles.value}>{data.budget}</Text>
      <Text style={styles.label}>Tools / Access needed:</Text>
      <Text style={styles.value}>{data.toolsNeeded}</Text>

      {/* Mission Alignment */}
      <Text style={styles.subHeader}>5. MISSION ALIGNMENT</Text>
      <Text style={styles.value}>{data.missionAlignment}</Text>

      {/* Decision */}
      <View style={styles.sectionHeaderNavy}>
        <Text>TEAM DECISION</Text>
      </View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 15, marginTop: 10 }}>
        <Checkbox checked={false} label="Approved" />
        <Checkbox checked={false} label="Needs revision" />
        <Checkbox checked={false} label="Not now" />
        <Checkbox checked={false} label="Rejected" />
      </View>

      <Text style={styles.label}>Notes from discussion:</Text>
      <Text style={styles.value}>_________________________________________________</Text>
      <Text style={styles.value}>_________________________________________________</Text>

      <Text style={styles.label}>Owner (who's accountable):</Text>
      <Text style={styles.value}>_________________________________________________</Text>
    </Page>
  </Document>
);
