import { Document, Page, PDFViewer, Text, StyleSheet, View, Font, Image } from '@react-pdf/renderer'
import './style.pdfdoc.scss'
import hopedoc from '../../../logo.png'
import sell from '../../../sell.jpg'
import TimesNewRomanFont from '../../../TimesNewRomanPSMT.ttf'
import TimesNewRomanBoldFont from '../../../TimesNewRomanPS-BoldMT.ttf'

Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});
Font.register({
  family: "Times New Roman Reg",
  src: TimesNewRomanFont
});
Font.register({
  family: "Times New Roman Bold",
  src: TimesNewRomanBoldFont
});
const probDiagns = {
  width: '90%',
  margin: '0 auto 0',
  flexDirection: 'row',
  alignItems: 'center',
}
const examineStyle = {
  textAlign: 'center',
  borderRight: '1px solid black',
  padding: '5px'
}
const trow = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
}
const styles = StyleSheet.create({
  body: {

  },
  hdr: {
    flexDirection: 'row',
    borderBottom: '1px solid black',
    fontSize: '11px',
    margin: '10px auto',
    paddingBottom: '10px',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  hdrimg: {
    width: '150px'
  },
  title: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: "Times New Roman Reg"
  },
  recomenTitle: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 9,
    marginTop: 8,
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    textAlign: 'center',
    color: 'red',
    margin: '0 auto'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: "Roboto"
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  birth: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    padding: 0,
    width: '50%'
  },
  birthWrapper: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 24
  },
  birthText: {
    borderTop: '1px solid black',
    width: '100%',
    fontFamily: "Times New Roman Reg",
    fontSize: 10
  },
  anamnesisSection: {
    textAlign: 'center'
  },
  reasonTitle: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
  },
  reasonSubTitle: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
    fontSize: 10
  },
  complaintTitle: {
    flexDirection: 'row',
    marginTop: 12,
    width: '100%',
    textAlign: 'left',
    flexWrap: 'wrap'
  },
  complaintTitleAnamnesis: {
    width: '100%',
    textAlign: 'left',
    marginTop: 8
  },
  complaintTitleFirstWord: {
    fontWeight: 700,
    fontFamily: "Times New Roman Bold",
  },
  tabl: {

  },
  tableRow: {
    ...(trow),
    borderTop: '1px solid black',
    borderBottom: '1px solid black',
  },
  tablHeaderNum: {
    borderRight: '1px solid black',
    borderLeft: '1px solid black',
    padding: '5px',
    width: '50px',
    height: '100%'
  },
  tablHeaderFIO: {
    width: '500px',
    ...(examineStyle),
  },
  tablHeaderDiagnosis: {
    width: '1000px',
    ...(examineStyle),
  },
  probableDiagnosis: {
    ...(probDiagns),
    borderBottom: '1px solid black'
  },
  secondaryDiagnosis: {
    ...(probDiagns),
  },
  probableDiagnosisText: {
    width: '750px',
    borderLeft: '1px solid left'
  },
  probableDiagnosisNum: {
    ...(examineStyle),
    borderRight: 'initial',
    fontFamily: "Times New Roman Bold",
    width: '350px'
  },
  tablHeaderTypeExamine: {
    ...(examineStyle),
    height: '100%',
    fontFamily: "Times New Roman Bold",
    width: '340px'
  },
  tablHeaderPlaceExamine: {
    ...(examineStyle),
    height: '100%',
    fontFamily: "Times New Roman Bold",
    width: '330px'
  },
  tablHeaderTargetExamine: {
    ...(examineStyle),
    fontFamily: "Times New Roman Bold",
    width: '330px'
  },
  commentsWrapper: {
    ...(trow),
    alignItems: 'start'
  },
  commentsNum: {
    width: '50px',
    textAlign: 'left',
    padding: '0px'
  },
  commentsSecText: {
    width: '100%',
    textAlign: 'left',
    borderBottom: '1px solid black',
  },
  commonSize: {
    width: '80%',
    marginHorizontal: 'auto'
  },
  finalDateAndFio: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  finalDateAndFioText: {
    textDecoration: 'underline'
  },
  exeDateText: { width: '150px', marginHorizontal: '10px' },
  managerAndSpeciality: { display: 'flex', flexDirection: 'column', width: '150px', alignItems: 'center', marginHorizontal: '10px', flexWrap: 'wrap' }

});

function MyDocContent({ applItem, isDeletedPlace, status}) {
  let list = []

  for (let index = 0; index < 50; index++) {
    let consdoc = {
      name: `док${index + 1}`,
      speciality: `уролог${index + 1}`
    }
    list.push(consdoc)
  }

  const { mostProblDiagnosis, secondaryDiagnosis, patientBirthDate, patientName, complaint, anamnesis, consiliumDoctors, diagnostic, checkupPlans, diagnosticData, comments, execDate, manager, managerSpeciality, managerSignUrlPath } = applItem
  const currentYear = new Date().getFullYear()
  const yearsOld = new Date(patientBirthDate).getFullYear()
  const month = new Date(patientBirthDate).getMonth()
  const date = new Date(patientBirthDate).getDate()
  const age = currentYear - yearsOld
  return (
    <PDFViewer>
      <Document>
        <Page style={styles.title}>
          <View style={{ ...styles.commonSize, ...styles.hdr, marginBottom: 5 }} fixed>
            <Image src={hopedoc} style={styles.hdrimg} />
            <View>
              <Text>Makhachkala,Testovaya street</Text>
              <Text>floor 7 cabinet 709</Text>
              <Text>Phone +7(999)00177707</Text>
            </View>
          </View>
          <Text style={styles.recomenTitle}>
            {status}
          </Text>
          <Text style={{ ...styles.commonSize, ...styles.subtitle }}>
          (WARNING! THIS DOCUMNET IS FOR INNER USAGE ONLY)
          </Text>
          <View style={{ ...styles.commonSize, ...styles.birthWrapper }}>
            {patientName ? <View style={styles.birth}>
              <Text>
                {patientName}
              </Text>
              <Text style={styles.birthText}>
                Name
              </Text>
            </View> : <View></View>}
            {patientBirthDate ? <View style={styles.birth}>
              <Text>
                {`${date}.${month}.${yearsOld} г.р. (${age} лет)`}
              </Text>
              <Text style={styles.birthText}>
                Birth date
              </Text>
            </View> : <View></View>}
          </View>
          <Text style={styles.reasonTitle}>On the ground of:  </Text>
          <Text style={styles.reasonSubTitle}> (indicate the reasons: complaints, symptoms, syndromes, doctor's suspicion  and so on): </Text>
          <View style={{ ...styles.commonSize, ...styles.anamnesisSection }}>
            {complaint ? <Text style={styles.complaintTitle}><Text style={styles.complaintTitleFirstWord}>Complaints: </Text> {complaint}</Text> : null}
            {anamnesis ? <Text style={styles.complaintTitle}><Text style={styles.complaintTitleFirstWord}>Anamnesis: </Text>{anamnesis}
            </Text> : null}
            {diagnosticData ? <Text style={styles.complaintTitle}><Text style={styles.complaintTitleFirstWord}>Examination data: </Text>{diagnosticData}</Text> : null}
          </View>
          <View>
            <Text style={{ ...styles.reasonTitle, marginTop: 12 }} wrap={false}>Remote concilium is lead including:</Text>
            <Text style={{ ...styles.reasonTitle, fontSize: 10, marginTop: 4 }}>(Write name and specialities of doctors who took part in making summary): </Text>
            {consiliumDoctors ? <View style={{ ...styles.commonSize, ...styles.tabl, marginTop: 10 }} wrap={false}>
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tablHeaderNum, fontFamily: 'Times New Roman Bold' }}>№</Text>
                <Text style={{ ...styles.tablHeaderFIO, fontFamily: 'Times New Roman Bold' }}>Name</Text>
                <Text style={{ ...styles.tablHeaderFIO, fontFamily: 'Times New Roman Bold' }}>Speciality</Text>
              </View>
              {consiliumDoctors.map((consiliumDoctor, index) => <View style={styles.tableRow} wrap={false}>
                <Text style={styles.tablHeaderNum}>{index + 1}</Text>
                <Text style={{ ...styles.tablHeaderFIO, textAlign: 'left', fontFamily: 'Times New Roman Bold' }}>{consiliumDoctor.name}</Text>
                <Text style={{ ...styles.tablHeaderFIO, textAlign: 'left', fontFamily: 'Times New Roman Bold' }}>{consiliumDoctor.speciality}</Text>
              </View>)}
            </View> : null}
          </View>
          <View style={{ marginTop: 14, ...styles.commonSize }}>
            <Text style={{ fontFamily: 'Times New Roman Bold' }}>With purpose of differential diagnostics</Text>
            <Text style={{ fontFamily: 'Times New Roman Bold', fontSize: 10 }}>(indicate disease, facts and symptoms of clinical finding, which partially or  in full way corresponds to disease )</Text>
            <View style={{ ...styles.tabl, marginTop: 10 }}>
              <View style={styles.tableRow}>
                <Text style={{ ...styles.tablHeaderNum, fontFamily: 'Times New Roman Bold' }}>№</Text>
                <Text style={{ ...styles.tablHeaderDiagnosis, fontFamily: 'Times New Roman Bold' }}>Diagnosis</Text>
              </View>
              {diagnostic.map((diagnosis, index) => <View style={styles.tableRow} wrap={false}>
                <Text style={styles.tablHeaderNum}>{index + 1}</Text>
                <Text style={{ ...styles.tablHeaderDiagnosis, textAlign: 'left' }}>{diagnosis.diagnosis}</Text>
              </View>)}
            </View>
          </View>
          <View style={{ marginTop: 14, ...styles.commonSize }}>
            <View style={styles.probableDiagnosis} wrap={false}>
              <Text style={styles.probableDiagnosisNum}>
              Most probable diagnosis detected:
              </Text>
              <Text style={{ ...styles.probableDiagnosisText, padding: 5 }}>
                {mostProblDiagnosis}
              </Text>
            </View>
            <View style={styles.secondaryDiagnosis} wrap={false}>
              <Text style={styles.probableDiagnosisNum}>
              Secondary diagnosises detected:
              </Text>
              <Text style={{ ...styles.probableDiagnosisText, padding: 5 }}>
                {secondaryDiagnosis}
              </Text>
            </View>
          </View>
          <View style={{ marginTop: 14, ...styles.commonSize }}>
            {checkupPlans.length > 0 ? <View style={styles.tabl} wrap={false}>
              <Text style={{ fontFamily: 'Times New Roman Bold' }} wrap={false}>
              On the basis of helded consilium is recommended survey plan:
              </Text>
              <View style={{ ...styles.tableRow, alignItems: 'center' }} wrap={false}>
                <Text style={{ ...styles.tablHeaderNum, fontFamily: 'Times New Roman Bold' }}>№</Text>
                <Text style={styles.tablHeaderTypeExamine}>Examination type</Text>
                {(!isDeletedPlace || status) && <Text style={styles.tablHeaderPlaceExamine}>Place</Text>}
                <Text style={styles.tablHeaderTargetExamine}>Aim of medical examination</Text>
              </View>
              {checkupPlans.map((checkUpPlan, index) => <View style={styles.tableRow} wrap={false}>
                <Text style={styles.tablHeaderNum}>{index + 1}</Text>
                <Text style={styles.tablHeaderTypeExamine}>{checkUpPlan.kind}</Text>
                {(!isDeletedPlace || status) && <Text style={styles.tablHeaderPlaceExamine}>{checkUpPlan.place}</Text>}
                <Text style={styles.tablHeaderTargetExamine}>{checkUpPlan.target}</Text>
              </View>)}
            </View> : null}
            {comments ? <View style={styles.tabl}>
              <Text style={{ fontFamily: 'Times New Roman Bold', marginTop: 14, textAlign: 'left' }} wrap={false}>Explanations:</Text>
              {comments.map((comment, index) => <View style={{ ...styles.commentsWrapper, marginTop: 14 }} wrap={false}>
                <Text style={styles.commentsNum}>{index + 1}</Text>
                <Text style={styles.commentsSecText}>{comment.comment}</Text>
              </View>)}
            </View> : null}
          </View>
          {execDate && manager ?
            <View style={{ ...styles.commonSize, ...styles.finalDateAndFio, ...styles.finalDateAndFioText }} wrap={false}>
              <Text style={styles.exeDateText}>{new Date(execDate).toLocaleString().substring(0, 10)}</Text>
            { managerSignUrlPath ? <Image src={managerSignUrlPath} style={styles.hdrimg} /> : null }
              <Image src={sell} style={styles.hdrimg} />
              <View style={styles.managerAndSpeciality}>
                {managerSpeciality ? <Text >{managerSpeciality}</Text> : null}
                <Text>{manager}</Text>
              </View>
            </View> : null}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default MyDocContent;
