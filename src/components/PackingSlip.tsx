import React from 'react'
import { Document, Page, Text, View } from '@react-pdf/renderer'
import { styles } from './PackingSlipStyles'
import {
  AMANAT_BUSINESS_ID,
  DWP_BUSINESS_ID,
  DWP_STAGING_BUSINESS_ID,
  AMANAT_STAGING_BUSINESS_ID,
} from 'constants/BusinessIds'
interface propsTypes {
  packingSlipData: OrderListingResponse['result']
  pdfType?: string
  totalWeight?: number
  weightUnit?: string
}
const PackingSlip = (props: propsTypes) => {
  const { eatout_name, eatout_id } = JSON.parse(
    localStorage.getItem('businessInfo')!,
  )
  const fixedDecimalPlaces = (value: string) => {
    return parseFloat(value).toFixed(0) // Add Descaimal Places From Local storage
  }
  return (
    <>
      <Document>
        {props.packingSlipData.map(
          (selectedOrder: OrderListingResponseResult, index: number) => {
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
              total_qty,
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
            console.log(
              'discount_value',
              discount_value,
              'tax_value',
              tax_value,
            )
            return (
              <Page size="A4" style={styles.page} key={index} wrap>
                {props.pdfType === 'pdf' ? (
                  <View>
                    <View style={styles.pdfEatOutNameView}>
                      <Text style={styles.pdfEatOutName}>{eatout_name}</Text>
                    </View>
                  </View>
                ) : (
                  <View>
                    <View style={styles.spaceBetweenRow}>
                      <Text style={styles.packingSlip}>PACKING SLIP</Text>
                      <Text style={styles.texth1}>{eatout_name}</Text>
                    </View>
                  </View>
                )}

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
                        <Text style={styles.detailBoldTextDate}>{date}</Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.detailBoxTextCss}>Order#:</Text>
                        <Text style={styles.detailBoldTextCssOrderId}>
                          {order_id}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.detailBoxTextCss}>
                          Payment Type:
                        </Text>
                        <Text style={styles.detailBoxTextCssPaymentType}>
                          {payment_type}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.detailBoxTextCss}>Order Type:</Text>
                        <Text style={styles.detailBoxTextCssPaymentTypeOderId}>
                          {orderType}
                        </Text>
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
                        <Text style={styles.detailBoxTextCssPaymentTypeName}>
                          {name}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.detailBoxTextCss}>Mobile:</Text>
                        <Text style={styles.detailBoxTextCssPaymentTypeMobile}>
                          {mobile_number}
                        </Text>
                      </View>
                      <View style={styles.row}>
                        <Text style={styles.detailBoxTextCss}>Address:</Text>
                        <Text style={styles.detailBoxTextCssPaymentTypeAddress}>
                          {address}
                        </Text>
                      </View>
                      {note !== '' && (
                        <View style={styles.row}>
                          <Text style={styles.detailBoxTextCss}>Note:</Text>
                          <Text style={styles.detailBoxTextCssNote}>
                            {note}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
                {props.pdfType === 'pdf' ? (
                  <View style={styles.tablerowhead}>
                    <View style={styles.tablePadding}>
                      <View style={styles.tableColPdfItemHead}>
                        <Text style={styles.textth2}>Item No</Text>
                      </View>
                      <View style={styles.tableColPdfCategoryHead}>
                        <Text style={styles.textth2}>Category</Text>
                      </View>
                      <View style={styles.tableColPdfItem}>
                        <Text style={styles.textth2}>Item</Text>
                      </View>
                      <View style={styles.tableColPdfBrandHead}>
                        <Text style={styles.textth2}>Brand</Text>
                      </View>
                      <View style={styles.tablecolPdf}>
                        <Text style={styles.textth2}>
                          {eatout_id === DWP_STAGING_BUSINESS_ID ||
                          eatout_id === DWP_BUSINESS_ID
                            ? 'MRP'
                            : 'Price'}
                        </Text>
                      </View>
                      <View style={styles.tablecolPdf}>
                        <Text style={styles.textth2}>Quantity</Text>
                      </View>
                      {props.totalWeight !== 0 && (
                        <View style={styles.tablecolPdf}>
                          <Text style={styles.textth2}>Weight</Text>
                        </View>
                      )}
                      <View style={styles.tableColPdfAmountHead}>
                        <Text style={styles.textth2}>Amount</Text>
                      </View>
                      <View style={styles.tablecolPdf}>
                        <Text style={styles.textth2}>Total</Text>
                      </View>
                    </View>
                  </View>
                ) : (
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
                )}

                <View style={styles.tableBox}>
                  {order_detail.map(
                    (
                      orderDetail: OrderListingResponseOrderDetail,
                      i: number,
                    ) => {
                      let row = orderDetail
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
                          {props.pdfType === 'pdf' ? (
                            <View style={styles.tablerow}>
                              <View style={styles.tableColPdfItemRow}>
                                <Text style={styles.texttPdfItem}>{i + 1}</Text>
                              </View>
                              <View style={styles.categoryCol}>
                                <Text style={styles.texttPdf}>
                                  {orderDetail.item_cat_name}
                                </Text>
                              </View>
                              <View style={styles.itemColPdf}>
                                <Text style={styles.texttPdf}>
                                  {`${orderDetail.item_name}`}
                                </Text>
                                {/* showing  "SKU" only for DWP  */}
                                {(eatout_id == DWP_STAGING_BUSINESS_ID ||
                                  eatout_id == DWP_BUSINESS_ID ||
                                  eatout_id == AMANAT_BUSINESS_ID ||
                                  eatout_id == AMANAT_STAGING_BUSINESS_ID) && (
                                  <Text style={styles.texttcomPdf}>
                                    SKU:{orderDetail.product_code}
                                  </Text>
                                )}
                                {optionSets.map((f: any, optionIndex: number) =>
                                  f.haveInnerOptions ? (
                                    <Text
                                      style={styles.textDonePdf}
                                      key={optionIndex}
                                    >
                                      -
                                      {`${f.name}${
                                        parseFloat(f.price)
                                          .toFixed(2)
                                          .toString() === '0.00'
                                          ? ''
                                          : `, Qty: ${f.quantity}, Price: ${f.price}`
                                      } ${
                                        f.inner_options === ''
                                          ? ''
                                          : `(${f.inner_options})`
                                      }`}
                                    </Text>
                                  ) : (
                                    <Text style={styles.textDonePdf}>
                                      -
                                      {`${f.name}${
                                        parseFloat(f.price)
                                          .toFixed(2)
                                          .toString() === '0.00'
                                          ? ''
                                          : `, Qty: ${f.quantity}, Price: ${f.price}`
                                      }`}
                                    </Text>
                                  ),
                                )}
                                <Text style={styles.texttcom}>
                                  {`${orderDetail.comment}`}
                                </Text>
                              </View>

                              <View style={styles.tableColPdfBrand}>
                                <Text style={styles.texttPdf}>
                                  {orderDetail.brand_name}
                                </Text>
                              </View>
                              <View style={styles.tableColPdfPrice}>
                                <Text style={styles.texttPdf}>
                                  {fixedDecimalPlaces(orderDetail.price)}
                                </Text>
                              </View>
                              <View style={styles.tableColPdf}>
                                <Text style={styles.texttPdf}>
                                  {orderDetail.quantity}
                                </Text>
                              </View>
                              {props.totalWeight !== 0 && (
                                <View style={styles.tableColPdf}>
                                  <Text style={styles.texttPdf}>{`${parseFloat(
                                    orderDetail.weight + '',
                                  ).toFixed(0)} ${
                                    orderDetail.weight_unit
                                  }`}</Text>
                                </View>
                              )}
                              <View style={styles.tableColPdf}>
                                <Text style={styles.texttPdf}>
                                  {fixedDecimalPlaces(orderDetail.total + '')}
                                </Text>
                              </View>
                              <View style={styles.tableColPdf}>
                                <Text style={styles.texttPdf}>
                                  {fixedDecimalPlaces(
                                    orderDetail.item_level_grand_total + '',
                                  )}
                                </Text>
                              </View>
                            </View>
                          ) : (
                            <View
                              style={styles.tablerowPackingSlip}
                              wrap={false}
                            >
                              <View style={styles.numbertablecol}>
                                <Text style={styles.numbertextt}>{i + 1}</Text>
                              </View>

                              <View style={styles.tablecolItem}>
                                <Text style={styles.textt}>
                                  {orderDetail.item_cat_name}
                                </Text>
                              </View>

                              <View style={styles.itemtablecol}>
                                <Text>{`${orderDetail.item_name}`}</Text>
                                {/* showing  "SKU" only for DWP  */}
                                {(eatout_id == DWP_STAGING_BUSINESS_ID ||
                                  eatout_id == DWP_BUSINESS_ID) && (
                                  <Text style={styles.texttcom}>
                                    {`${orderDetail.product_code}`}
                                  </Text>
                                )}
                                {optionSets.map((f: any, optionIndex: any) =>
                                  f.haveInnerOptions ? (
                                    <Text
                                      style={styles.textDonePdf}
                                      key={optionIndex}
                                    >
                                      -
                                      {`${f.name}${
                                        parseFloat(f.price)
                                          .toFixed(2)
                                          .toString() === '0.00'
                                          ? ''
                                          : `, Qty: ${f.quantity}, Price: ${f.price}`
                                      } ${
                                        f.inner_options === ''
                                          ? ''
                                          : `(${f.inner_options})`
                                      }`}
                                    </Text>
                                  ) : (
                                    <Text
                                      style={styles.textDonePdf}
                                      key={optionIndex}
                                    >
                                      -
                                      {`${f.name}${
                                        parseFloat(f.price)
                                          .toFixed(2)
                                          .toString() === '0.00'
                                          ? ''
                                          : `, Qty: ${f.quantity}, Price: ${f.price}`
                                      }`}
                                    </Text>
                                  ),
                                )}
                                <Text>{`${orderDetail.comment}`}</Text>
                              </View>

                              <View style={styles.brandtablecol}>
                                <Text style={styles.textt}>
                                  {orderDetail.brand_name}
                                </Text>
                              </View>

                              <View style={styles.numbertablecol}>
                                <Text style={styles.numbertextt}>
                                  {orderDetail.quantity}
                                </Text>
                              </View>
                            </View>
                          )}

                          <View style={styles.divider}></View>
                        </React.Fragment>
                      )
                    },
                  )}
                </View>

                <View style={styles.spacer}></View>
                <View style={styles.rowend} wrap={false}>
                  <View style={styles.currencyrow2}></View>

                  <View style={styles.currencyrow}>
                    <Text style={styles.texth2th}>Total Quantity</Text>
                  </View>

                  {/* {props.pdfType === 'packingSlip' && ( */}
                  <View style={styles.currencyrowTotalQuantity}>
                    <Text>{`${total_qty}`}</Text>
                  </View>
                  {/* )} */}
                </View>
                {props.pdfType === 'pdf' && (
                  <View>
                    <View style={styles.rowend}>
                      <View style={styles.currencyrow2}></View>
                      <View style={styles.currencyrow}>
                        <Text style={styles.texth2th}>
                          {/* showing  "Total Amount (Inclusive of Taxes)" only for DWP  */}
                          {eatout_id === DWP_STAGING_BUSINESS_ID ||
                          eatout_id === DWP_BUSINESS_ID
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
                          <Text style={styles.texth2tCouponCode}>
                            {fixedDecimalPlaces(custom_code_discount_value)}
                          </Text>
                        </View>
                      </View>
                    )}
                    {discount_value !== '0' && (
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
                    {delivery_charges !== '0' && (
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
                    {tax_value !== '0' && (
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

                    {service_charges !== '0' && (
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
                )}
                <View style={styles.headerDivider}></View>
              </Page>
            )
          },
        )}
      </Document>
    </>
  )
}
export default PackingSlip
