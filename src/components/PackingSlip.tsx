import React from 'react'
import {
  Document,
  Page,
  Text,
  Image,
  Font,
  View,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer'

import Regular from '../fonts/roboto/Roboto-Regular.ttf'
import Italic from '../fonts/roboto/Roboto-Italic.ttf'
import Bold from '../fonts/roboto/Roboto-Bold.ttf'
import Black from '../fonts/roboto/Roboto-Black.ttf'
Font.register({
  family: 'Roboto',
  fonts: [
    { src: Regular },
    { src: Italic, fontStyle: 'italic' },
    { src: Bold, fontWeight: 'bold' },
    { src: Black, fontWeight: 'heavy' },
  ],
})
interface props {
  packingSlipData: any
  pdfType?: string
}
const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
  },
  spaceBetweenRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  Detailrow: {
    overflow: 'hidden',
    width: '100%',
    flexDirection: 'row',
    maxWidth: '100%',
  },
  row: {
    overflow: 'hidden',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  rowSection: {
    width: '100%',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '24px',
  },
  packingSlip: {
    paddingTop: 25,
    paddingLeft: 30,
    fontSize: 24,
    marginTop: 10,
    color: '#D9134D',
    fontFamily: 'Roboto',
  },
  image: {
    width: '60px',
    height: '60px',
    marginLeft: 'auto',
    marginRight: 30,
    objectFit: 'contain',
  },
  texth1: {
    marginLeft: 'auto',
    marginRight: 30,
    fontSize: 12,
    marginTop: 10,
    paddingTop: 25,
  },
  divider: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 3,
    width: '90%',
    height: 1,
  },
  headerDivider: {
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 3,
    // marginTop: 1,
    width: '90%',
    backgroundColor: '#c4c2c2',
    height: 2,
  },
  skuB: {
    marginLeft: 30,
    padding: '4px',
    fontSize: 10,
    marginTop: 1,
    marginBottom: 5,
    color: '#757575',
    fontFamily: 'Roboto',
  },
  statusCss: {
    padding: '4px',
    fontSize: 10,
    marginTop: 1,
    marginBottom: 6,
    color: '#000000',

    fontFamily: 'Roboto',
  },
  statusCommentCss: {
    // width: '40%',
    // justifyContent: 'flex-start',
    // padding: '4px',
    fontSize: 10,
    marginTop: 1,
    marginLeft: 10,
    // marginBottom: 6,
    color: '#000000',
    fontFamily: 'Roboto',
  },
  sku: {
    fontFamily: 'Roboto',
    // width: '40%',
    justifyContent: 'flex-start',
    marginLeft: '34px',
    fontSize: 10,
    marginTop: 2,
    // marginBottom: 1,
    color: '#757575',
  },
  pcode: {
    lineHeight: 1.1,
    width: '40%',
    marginLeft: 10,
    justifyContent: 'flex-end',
    marginRight: 10,
    fontSize: 8,
    marginTop: 1,
    marginBottom: 1,
    color: '#121111',
  },
  tablerowhead: {
    flexDirection: 'row',
    marginLeft: 30,
    paddingLeft: 2,
    paddingRight: 2,
    marginTop: 8,
    backgroundColor: '#F5F5F5',
    borderTop: 1,
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    borderColor: '#f2f0f1',
    borderStyle: 'solid',
    borderRadius: 0,
  },
  headBox: {
    marginLeft: 30,
    padding: 10,
    marginTop: 8,
    paddingTop: 14,
    paddingBottom: 14,
    paddingLeft: 16,
    overflow: 'hidden',
    width: 250,
    backgroundColor: '#F5F5F5',

    borderTop: 1,
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    borderColor: '#f2f0f1',
    borderStyle: 'solid',
    borderRadius: 0,
  },
  cardSectionCSS: {
    display: 'flex',
    flexDirection: 'column',
  },
  detailBox: {
    marginLeft: 30,
    width: 250,

    paddingTop: 20,
    paddingBottom: 30,
    paddingLeft: 16,

    borderTop: 1,
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    borderColor: '#f2f0f1',
    borderStyle: 'solid',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  detailBoxCustomerDetail: {
    marginLeft: 30,
    width: 250,
    paddingTop: '20px',
    paddingBottom: 30,
    paddingLeft: '16px',
    borderTop: 1,
    borderBottom: 1,
    borderLeft: 1,
    borderRight: 1,
    borderColor: '#f2f0f1',
    borderStyle: 'solid',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
  },
  boxTextCss: {
    fontFamily: 'Roboto',
    width: '40%',
    fontSize: 10,
    justifyContent: 'flex-start',
    marginTop: 2,
    color: '#212121',
  },
  detailBoxTextCss: {
    fontFamily: 'Roboto',
    // width: '40%',
    marginTop: 2,
    justifyContent: 'flex-start',
    fontSize: 9,
    color: '#757575',
  },
  detailBoldTextCss: {
    lineHeight: '15px',
    fontFamily: 'Roboto',
    //width: '40%',
    justifyContent: 'flex-start',
    fontSize: 9,
    marginTop: 2,
    color: '#212121',
    marginLeft: '0px',
  },
  numbertablecol: {
    width: '10%',
    justifyContent: 'flex-start',
  },
  tablecol: {
    width: '20%',
    justifyContent: 'flex-start',
    marginLeft: 2,
  },
  brandtablecol: {
    width: '10%',
    justifyContent: 'flex-start',
    marginLeft: 2,
  },
  itemtablecol: {
    width: '45%',
    fontSize: 10,
    justifyContent: 'flex-start',
    marginRight: 10,
  },
  textth2: {
    marginTop: 4,
    marginBottom: 4,
    fontSize: 10,
    // fontWeight: "bold",
  },
  tablePadding: {
    display: 'flex',
    flexDirection: 'row',
    padding: 4,
  },
  tablerow: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 30,
    // width: "90%",
    paddingTop: 4,
    marginTop: 5,
  },
  numbertextt: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 10,
    lineHeight: 1,
  },
  textt: {
    lineHeight: 1,
    marginLeft: 2,
    fontSize: 10,
  },
  bolder: {
    lineHeight: 1,
    marginLeft: 2,
    fontSize: 12,
  },
  spacer: {
    marginBottom: 6,
    flexDirection: 'row',
  },
  rowend: {
    width: '100%',
    flexDirection: 'row',
    textAlign: 'left',
    marginBottom: 3,
  },
  currencyrowTotalQuantity: {
    //width: '50vw',
    // marginTop: 4,
    ///   marginBottom: 4,
    fontSize: 10,
    marginLeft: 40,
  },
  currencyrow2: {
    width: '40%',
  },
  texth2th: {
    marginLeft: 220,
    fontSize: 10,
  },
  texth2t: {
    marginLeft: 100,
    fontSize: 10,
    color: 'red',
  },
  texttcom: {
    marginLeft: '2px',
    fontSize: 8,
    color: 'black',
    lineHeight: 0.8,
  },
  texttaddone: {
    lineHeight: 1,
    fontSize: 7,
    color: 'black',
  },
  boldOptionSet: {
    lineHeight: 1,
    fontSize: 10,
  },
  footer: {
    width: '90%',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 1,
  },
  hst: {
    justifyContent: 'flex-start',
    marginRight: 'auto',
    fontSize: 9,
    color: '#121111',
  },
  phone: {
    justifyContent: 'flex-start',
    marginLeft: 'auto',
    fontSize: 9,
    color: '#121111',
  },
  email: {
    justifyContent: 'flex-start',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 9,
    color: '#121111',
  },
})

const PackingSlip = (props: props) => {
  const { eatout_name, eatout_id } = JSON.parse(
    localStorage.getItem('businessInfo')!,
  )

  return (
    <>
      <Document>
        {props.packingSlipData.map((selectedOrder: any, index: any) => {
          const {
            status,
            order_id,
            name,
            date,
            mobile_number,
            user_email,
            landline_number,
            note,
            pickup_time,
            address,
            order_detail,
            totalQuantity,
            tax_type,
            statuscomment,
            order_type: orderType,
            order_type_flag: orderTypeFlag,
            delivery_date,
            payment_type,
            cnic,
          } = selectedOrder
          console.log('statuscomment', statuscomment)
          return (
            <Page size="A4" style={styles.page} key={index} wrap>
              <View>
                <View style={styles.spaceBetweenRow}>
                  <Text style={styles.packingSlip}>PACKING SLIP</Text>
                  <Text style={styles.texth1}>{eatout_name}</Text>
                </View>
              </View>

              <View style={styles.column}>
                <View style={styles.headerDivider}></View>
                <View style={styles.row}>
                  <Text style={styles.skuB}>{`STATUS:`}</Text>
                  <Text
                    style={styles.statusCss}
                  >{`${status.toUpperCase()}`}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.sku}>{`Status Comment:`}</Text>
                  <Text style={styles.statusCommentCss}>{statuscomment}</Text>
                </View>
              </View>
              <View style={styles.rowSection}>
                <View style={styles.cardSectionCSS}>
                  <View style={styles.headBox}>
                    <Text style={styles.boxTextCss}>{`Order Detail`}</Text>
                  </View>
                  <View style={styles.detailBox}>
                    <View style={styles.row}>
                      <Text style={styles.detailBoxTextCss}>Date:</Text>
                      <Text style={styles.detailBoldTextCss}>{date}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.detailBoxTextCss}>Order#:</Text>
                      <Text style={styles.detailBoldTextCss}>{order_id}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.detailBoxTextCss}>Payment Type:</Text>
                      <Text style={styles.detailBoldTextCss}>
                        {payment_type}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.detailBoxTextCss}>Order Type:</Text>
                      <Text style={styles.detailBoldTextCss}>{orderType}</Text>
                    </View>
                    {delivery_date !== '0000-00-00 00:00:00' && (
                      <View style={styles.row}>
                        <Text style={styles.detailBoxTextCss}>
                          Delivery Time:
                        </Text>
                        <Text style={styles.detailBoldTextCss}>
                          {delivery_date}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={styles.cardSectionCSS}>
                  <View style={styles.headBox}>
                    <Text style={styles.boxTextCss}>{`Customer Detail`}</Text>
                  </View>
                  <View style={styles.detailBoxCustomerDetail}>
                    <View style={styles.row}>
                      <Text style={styles.detailBoxTextCss}>Name:</Text>
                      <Text style={styles.detailBoldTextCss}>{name}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.detailBoxTextCss}>Mobile:</Text>
                      <Text style={styles.detailBoldTextCss}>
                        {mobile_number}
                      </Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={styles.detailBoxTextCss}>Address:</Text>
                      <Text style={styles.detailBoldTextCss}>{address}</Text>
                    </View>
                    {note !== '' && (
                      <View style={styles.row}>
                        <Text style={styles.detailBoxTextCss}>Note:</Text>
                        <Text style={styles.detailBoldTextCss}>{note}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.tablerowhead}>
                <View style={styles.tablePadding}>
                  <View style={styles.numbertablecol}>
                    <Text style={styles.textth2}>Item No</Text>
                  </View>
                  <View style={styles.tablecol}>
                    <Text style={styles.textth2}>Category</Text>
                  </View>
                  <View style={styles.itemtablecol}>
                    <Text style={styles.textth2}>Item</Text>
                  </View>
                  <View style={styles.brandtablecol}>
                    <Text style={styles.textth2}>Brand</Text>
                  </View>
                  <View style={styles.numbertablecol}>
                    <Text style={styles.textth2}>Quantity</Text>
                  </View>
                </View>
              </View>
              {order_detail.map((e: any, i: any) => {
                let row = e
                let options: any = {}
                const optionSets: any = []
                let count = 0
                let innerOptionsName = ''
                if (
                  row.options &&
                  row.options !== '[]' &&
                  row.options !== '{}' &&
                  Object.keys(row.options).length !== 0
                ) {
                  options = JSON.parse(row.options)
                  if (typeof options === 'string') {
                    options = JSON.parse(options)
                  }

                  for (const key in options) {
                    options[key].map((opt: any) => {
                      innerOptionsName = ''
                      let haveInnerOpt = opt.inner_options !== '' ? true : false
                      optionSets.push({
                        name: opt.name,
                        quantity: opt.quantity,
                        price: opt.price,
                        weight: opt.weight,
                        haveInnerOptions: haveInnerOpt,
                      })
                      let inner_options = opt.inner_options
                      if (inner_options !== '') {
                        for (const innerKey in inner_options) {
                          inner_options[innerKey].map((innerOpt: any) => {
                            innerOptionsName = `${innerOptionsName}${innerOpt.name},`
                          })
                        }
                      }
                      optionSets[count].inner_options = innerOptionsName
                      count++
                    })
                  }
                }
                return (
                  <React.Fragment key={i}>
                    <View style={styles.tablerow} wrap={false}>
                      <View style={styles.numbertablecol}>
                        <Text style={styles.numbertextt}>{i + 1}</Text>
                      </View>
                      {props.pdfType == '' && (
                        <View style={styles.tablecol}>
                          <Text style={styles.textt}>{e.label}</Text>
                        </View>
                      )}
                      <View style={styles.itemtablecol}>
                        <Text>{`${e.item_name}`}</Text>
                        {/* showing  "SKU" only for DWP  */}
                        {(eatout_id == 12180 || eatout_id == 12230) && (
                          <Text style={styles.texttcom}>
                            {`${e.product_code}`}
                          </Text>
                        )}
                        {optionSets.map((f: any, j: any) =>
                          f.haveInnerOptions ? (
                            <Text key={j}>
                              -
                              {`${f.name}${
                                parseFloat(f.price).toFixed(2).toString() ===
                                '0.00'
                                  ? ''
                                  : `, Qty: ${f.quantity}, Price: ${f.price}`
                              } ${
                                f.inner_options === ''
                                  ? ''
                                  : `(${f.inner_options})`
                              }`}
                            </Text>
                          ) : (
                            <Text key={j}>
                              -
                              {`${f.name}${
                                parseFloat(f.price).toFixed(2).toString() ===
                                '0.00'
                                  ? ''
                                  : `, Qty: ${f.quantity}, Price: ${f.price}`
                              }`}
                            </Text>
                          ),
                        )}
                        <Text>{`${e.comment}`}</Text>
                      </View>
                      <View style={styles.brandtablecol}>
                        <Text style={styles.textt}>{e.brand_name}</Text>
                      </View>
                      <View style={styles.numbertablecol}>
                        <Text style={styles.numbertextt}>{e.quantity}</Text>
                      </View>
                    </View>
                    <View style={styles.divider}></View>
                  </React.Fragment>
                )
              })}
              <View style={styles.spacer}></View>
              <View style={styles.rowend} wrap={false}>
                <View style={styles.currencyrow2}></View>

                <View style={styles.currencyrow}>
                  <Text style={styles.texth2th}>Total Quantity</Text>
                </View>

                {props.pdfType == '' && (
                  <View style={styles.currencyrowTotalQuantity}>
                    <Text>{`${totalQuantity}`}</Text>
                  </View>
                )}
              </View>
              <View style={styles.headerDivider}></View>
              <View style={styles.footer} wrap={false}>
                <Text style={styles.hst}>{`${tax_type}`}</Text>
                <Text
                  style={styles.email}
                >{`Email: ammad.ali@tossdown.com`}</Text>
                <Text style={styles.phone}>{`Phone# 03164094959`}</Text>
              </View>
            </Page>
          )
        })}
      </Document>
    </>
  )
}
export default PackingSlip
