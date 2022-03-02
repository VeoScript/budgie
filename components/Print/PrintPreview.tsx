import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { PDFViewer, Page, Text, View, Document } from '@react-pdf/renderer'
import { styles } from './PDFStyles'
import moment from 'moment'

interface TypeProps {
  user: any
  budget: any
  budgetDetails: any
}

const PrintPreview: React.FC<TypeProps> = ({ user, budget, budgetDetails }) => {

  let [isOpen, setIsOpen] = React.useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <React.Fragment>
      <button
        className="outline-none rounded-md px-3 py-1 text-sm text-purewhite bg-mattblack transition ease-in-out duration-100 hover:bg-opacity-80"
        type="button"
        onClick={openModal}
      >
        Print
      </button>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full h-screen overflow-hidden align-middle transition-all transform">
                <div className="flex flex-row items-center justify-between w-full px-5 text-white bg-black">
                  <h1 className="font-berkshireswash font-bold text-2xl cursor-default">Budgie</h1>
                  <h3 className="font-popppins font-normal text-xl cursor-default">
                    {budget.name}
                  </h3>
                  <button
                    className="p-3 outline-none transition ease-in-out duration-200 transform hover:scale-95"
                    type="button"
                    onClick={closeModal}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <PDFViewer className="w-full h-full pb-10">
                  <ExpenseReportDocument
                    user={user}
                    budget={budget}
                    budgetDetails={budgetDetails}
                  />
                </PDFViewer>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  )
}

const ExpenseReportDocument: React.FC<TypeProps> = ({ user, budget, budgetDetails }) => {

  let currency: string

  if (budget.currency === '₱') {
    currency = 'PHP'
  } else if (budget.currency === '$') {
    currency = 'USD'
  } else if (budget.currency === '¥') {
    currency = 'JPY'
  } else if (budget.currency === '₩') {
    currency = 'KRW'
  } else if (budget.currency === '€') {
    currency = 'EUR'
  } else if (budget.currency === '£') {
    currency = 'GBP'
  } else {
    currency = ''
  }

  return (
    <Document>
      <Page size="LETTER">
        <View style={styles.header}>
          <View style={styles.header_container_left}>
            <Text style={styles.header_title}>{ budget.name }</Text>
            <Text style={styles.header_subtitle}>Budget Plan</Text>
          </View>
          <View style={styles.header_container_right}>
            <Text style={styles.header_date}>{ moment(new Date()).format('LL') }</Text>
            <Text style={styles.header_subtitle}>Date Reported</Text>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.body_container_left}>
            <Text style={styles.body_title_income}>Income: </Text>
            <Text style={styles.body_title_income_value}>
              { currency + " " + budget.income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
            </Text>
          </View>
          <View style={styles.body_container_right}>
            <Text style={styles.body_title_expense}>Expenses: </Text>
            <Text style={styles.body_title_expense_value}>
              {  currency + " " + budget.expense.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
            </Text>
          </View>
          <View style={styles.body_container_center}>
            <Text style={styles.body_title_balance}>Balance: </Text>
            <Text style={styles.body_title_balance_value}>
              { currency + " " + budget.balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }
            </Text>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.table_header_row}>
            <View style={styles.table_header_column}>
              <Text style={styles.table_header_text}>Type</Text>
            </View>
            <View style={styles.table_header_column}>
              <Text style={styles.table_header_text}>Name</Text>
            </View>
            <View style={styles.table_header_column}>
              <Text style={styles.table_header_text}>Amount</Text>
            </View>
            <View style={styles.table_header_column}>
              <Text style={styles.table_header_text}>Created at</Text>
            </View>
          </View>
          {/* Display all budget details in the table */}
          {budgetDetails.map((budgetDetail: any, counter: number) => (
            <View style={styles.table_body_row} key={counter}>
              <View style={styles.table_body_column}>
                <Text style={styles.table_body_text}>{ budgetDetail.type }</Text>
              </View>
              <View style={styles.table_body_column}>
                <Text style={styles.table_body_text}>{ budgetDetail.name }</Text>
              </View>
              <View style={styles.table_body_column}>
                <Text style={styles.table_body_text}>{ budgetDetail.values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</Text>
              </View>
              <View style={styles.table_body_column}>
                <Text style={styles.table_body_text}>{ moment(budgetDetail.date).format('L') }</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={styles.budget_owner}>
          <Text style={styles.budget_owner_name}>{ user.name }</Text>
          <Text style={styles.budget_owner_subtext}>Budget Owner</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footer_text}>
            &copy; { new Date().getFullYear() }, All rights reserved. <Text style={styles.footer_text_bold}>Budgie</Text> by VEOSCRIPT.
          </Text>
        </View>
      </Page>
    </Document>
  )
}

export default PrintPreview