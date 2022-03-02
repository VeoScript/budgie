import { Font, StyleSheet } from '@react-pdf/renderer'

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf', fontWeight: 1000 }
  ]
})

export const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'space-between',
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 30
  },
  header_container_left: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: 1000,
    paddingTop: 20
  },
  header_container_right: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    width: 1000,
    paddingTop: 20
  },
  header_title: {
    fontFamily: 'Open Sans',
    fontWeight: 'heavy'
  },
  header_subtitle: {
    fontFamily: 'Open Sans',
    fontSize: 10,
    color: '#333333'
  },
  header_date: {
    fontFamily: 'Open Sans',
    fontSize: 12
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignContent: 'center',
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 30
  },
  body_container_left: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    paddingTop: 5
  },
  body_container_right: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-end',
    paddingTop: 5
  },
  body_container_center: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: 5
  },
  body_title_income: {
    fontFamily: 'Open Sans',
    fontWeight: 'heavy',
    fontSize: 12,
    color: '#495546'
  },
  body_title_expense: {
    fontFamily: 'Open Sans',
    fontWeight: 'heavy',
    fontSize: 12,
    color: '#495546'
  },
  body_title_balance: {
    fontFamily: 'Open Sans',
    fontWeight: 'heavy',
    fontSize: 12,
    color: '#495546'
  },body_title_income_value: {
    fontFamily: 'Open Sans',
    fontWeight: 'heavy',
    fontSize: 12,
  },
  body_title_expense_value: {
    fontFamily: 'Open Sans',
    fontWeight: 'heavy',
    fontSize: 12,
  },
  body_title_balance_value: {
    fontFamily: 'Open Sans',
    fontWeight: 'heavy',
    fontSize: 12,
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    paddingTop: 30,
    paddingHorizontal: 30
  },
  table_header_row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    backgroundColor: '#23445C'
  },
  table_header_column: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    width: '25%',
    height: '100%',
    border: 1,
    borderColor: '#333333',
    padding: 3
  },
  table_header_text: {
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    fontSize: 11,
    color: '#FFFFFF'
  },
  table_body_row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    backgroundColor: '#FFFFFF'
  },
  table_body_column: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'flex-start',
    width: '25%',
    height: '100%',
    border: 1,
    borderColor: '#333333',
    padding: 3
  },
  table_body_text: {
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    fontSize: 11,
  },
  budget_owner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    alignContent: 'center',
    width: '100%',
    paddingVertical: 60,
    paddingHorizontal: 30
  },
  budget_owner_name: {
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  budget_owner_subtext: {
    fontFamily: 'Open Sans',
    fontWeight: 'light',
    fontSize: 10,
    textTransform: 'capitalize',
    color: '#555555'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    padding: 10
  },
  footer_text: {
    fontFamily: 'Open Sans',
    fontWeight: 'normal',
    fontSize: 8,
    textAlign: 'center',
    width: '100%',
    color: '#696B70'
  },
  footer_text_bold: {
    fontWeight: 'heavy',
  }
})