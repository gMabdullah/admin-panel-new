import React from 'react'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import { styles } from './PackingSlipStyles'
import { useSelector } from 'store'
interface props {
  packingSlipData: any
  pdfType?: string
}
const PackingSlip = (props: props) => {
  const { eatout_name, eatout_id } = JSON.parse(
    localStorage.getItem('businessInfo')!,
  )
  // const { decimalPlaces, label } = useSelector((state) => state.main)
  const fixedDecimalPlaces = (value: string) => {
    return parseFloat(value).toFixed(0) // Add Descaimal Places From Local storage
  }
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
            delivery_charges,
            tax_value,
            tip,
            service_charges,
            grand_total,
            statuscomment,
            order_type: orderType,
            order_type_flag: orderTypeFlag,
            delivery_date,
            payment_type,
            total, //Order Total
            custom_code_type,
            custom_code_discount_value,
            discount_value,
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
              <View style={styles.tableBox}>
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
                        let haveInnerOpt =
                          opt.inner_options !== '' ? true : false
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
              </View>

              <View style={styles.spacer}></View>
              <View style={styles.rowend} wrap={false}>
                <View style={styles.currencyrow2}></View>

                <View style={styles.currencyrow}>
                  <Text style={styles.texth2th}>Total Quantity</Text>
                </View>

                {/* {props.pdfType === 'packingSlip' && ( */}
                <View style={styles.currencyrowTotalQuantity}>
                  <Text>{`${totalQuantity}`}</Text>
                </View>
                {/* )} */}
              </View>
              {/* {props.pdfType === 'pdf' && ( */}
              <View>
                <View style={styles.rowend}>
                  <View style={styles.currencyrow2}></View>
                  <View style={styles.currencyrow}>
                    <Text style={styles.texth2th}>
                      {/* showing  "Total Amount (Inclusive of Taxes)" only for DWP  */}
                      {eatout_id === 12180 || eatout_id === 12230
                        ? 'Total Amount (Inclusive of Taxes)'
                        : 'Total'}
                    </Text>
                  </View>
                  <View style={styles.currencyrow}>
                    <Text style={styles.texth2t}>
                      {fixedDecimalPlaces(total)}
                    </Text>
                  </View>
                </View>
                {custom_code_type === '0' && (
                  <View style={styles.rowend}>
                    <View style={styles.currencyrow2}></View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.texth2th}>Coupon Code</Text>
                    </View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.texth2t}>
                        {fixedDecimalPlaces(custom_code_discount_value)}
                      </Text>
                    </View>
                  </View>
                )}
                {/* {haveWeight && totalWeight !== 0 && (
                    <View style={styles.rowend}>
                      <View style={styles.currencyrow2}></View>
                      <View style={styles.currencyrow}>
                        <Text style={styles.texth2th}>Total Weight</Text>
                      </View>
                      <View style={styles.currencyrow}>
                        <Text style={styles.texth2t}>{`${parseFloat(
                          totalWeight,
                        ).toFixed(decimalPlaces)} ${weightUnit}`}</Text>
                      </View>
                    </View>
                  )} */}
                {discount_value !== 0 && (
                  <View style={styles.rowend}>
                    <View style={styles.currencyrow2}></View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.texth2th}>Discount</Text>
                    </View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.texth2tDiscount}>
                        {fixedDecimalPlaces(discount_value)}
                      </Text>
                    </View>
                  </View>
                )}
                {delivery_charges !== 0 && (
                  <View style={styles.rowend}>
                    <View style={styles.currencyrow2}></View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.texth2th}>Delivery Charges</Text>
                    </View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.texth2tDeliveryCharges}>
                        {fixedDecimalPlaces(delivery_charges)}
                      </Text>
                    </View>
                  </View>
                )}
                {tax_value !== 0 && (
                  <View style={styles.rowend}>
                    <View style={styles.currencyrow2}></View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.texth2th}>Tax</Text>
                    </View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.textTax}>
                        {fixedDecimalPlaces(tax_value)}
                      </Text>
                    </View>
                  </View>
                )}
                {tip !== 0 && (
                  <View style={styles.rowend}>
                    <View style={styles.currencyrow2}></View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.texth2th}>{'tax'}</Text>
                    </View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.textTax}>
                        {fixedDecimalPlaces(tip)}
                      </Text>
                    </View>
                  </View>
                )}

                {service_charges !== 0 && (
                  <View style={styles.rowend}>
                    <View style={styles.currencyrow2}></View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.texth2th}>Service Charges</Text>
                    </View>
                    <View style={styles.currencyrow}>
                      <Text style={styles.texServiceCharges}>
                        {fixedDecimalPlaces(service_charges)}
                      </Text>
                    </View>
                  </View>
                )}

                <View style={styles.divider}></View>
                <View style={styles.rowend}>
                  <View style={styles.currencyrow2}></View>
                  <View style={styles.currencyrow}>
                    <Text style={styles.texth2g}>Grand Total</Text>
                  </View>
                  <View style={styles.currencyrow}>
                    <Text style={styles.texth2g2}>
                      {fixedDecimalPlaces(grand_total)}
                    </Text>
                  </View>
                </View>
              </View>
              {/* )} */}
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
