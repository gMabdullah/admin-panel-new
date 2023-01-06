import React, { useState,useEffect } from 'react'

import { Typography, Grid,Stack,Divider,Box} from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

import SearchField from 'components/SearchField'
import CustomButton from 'components/CustomButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import MultiSelectDropDown from 'components/MultiSelectDropDown'
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import FilterListIcon from '@mui/icons-material/FilterList';
import MainCard from 'components/cards/MainCard'
import DragDropTableNew from 'components/DragDropTableNew'
import useAxios from "axios-hooks";

// dropdown data
const branches = [
  { label: 'All Branches', value: "1" },
  { label: 'Model Town Branch', value:"2" },
  { label: 'Johar Town Branch', value: "3"},
  { label: 'Iqbal Town Branch', value: "4" },
]

const ordersType = [
  { label: 'Orders Type', value: "1" },
  { label: 'Pickup', value:"2" },
  { label: 'Delivery', value: "3"},
  { label: 'COD', value: "4" },
]

const cityList = [
  { label: 'City', value: "1" },
  { label: 'Lahore', value:"2" },
  { label: 'Islamabad', value: "3"},
  { label: 'Karachi', value: "4" },
]

const status = [
  { label: 'Statuses', value: "1" },
  { label: 'Pending', value:"2" },
  { label: 'Confirmed', value: "3"},
  { label: 'Confirmed', value: "4" },
]
const Items = () => {
  const { eatout_id, user_id } = JSON.parse(
    localStorage.getItem("businessInfo")!
  );
  const [items, setItems] = useState<ProductResponse["items"]>();
  const [branchName, setBranchName] = React.useState<string[]>([
    branches[0].label,
  ])
  const [orderType, setOrderType] = React.useState<string[]>([
    ordersType[0].label,
  ])
  const [city, setCity] = React.useState<string[]>([cityList[0].label])
  const [orderStatus, setOrderStatus] = React.useState<string[]>([
    status[0].label,
  ])

  const handleBranchChange = (event: SelectChangeEvent<typeof branchName>) => {
    const {
      target: { value },
    } = event

    setBranchName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }
// API Call For Product //
const [{ data: productData },getProductApi] = useAxios(
  {
    url: `products?business_id=${eatout_id}&option_set=0&type&menu_type_id=0&num=&offset=&query=&cat_id=&brand_id=$&branch_id=&admin_id=${user_id}`,
    method: "GET",
  },
  { manual: true }
);
console.log("itemsData",productData)
/**************************************************** */


/*********Get Item data from API Product for table***********/
useEffect(() => {
 (async ()=>{
    const productResultApi=await getProductApi();
    if(productResultApi.data && productResultApi.data.items.length > 0){
      const {items } = productResultApi.data
     // const {items}=productData;
      setItems(items)
      }
 })()
  

}, []);


  const handleOrderTypeChange = (
    event: SelectChangeEvent<typeof orderType>,
  ) => {
    const {
      target: { value },
    } = event

    setOrderType(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const handleCityChange = (event: SelectChangeEvent<typeof city>) => {
    const {
      target: { value },
    } = event

    setCity(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }

  const handleStatusChange = (event: SelectChangeEvent<typeof orderStatus>) => {
    const {
      target: { value },
    } = event

    setOrderStatus(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    )
  }
// Header Key of the table //

 const keysOfItems :typeKeyOfItem["keysOfItems"]= [
  { key: "image", value: "Image", align: "center" },
  { key: "name", value: "Item Name", align: "left" },
  { key: "category", value: "Category", align: "left" },
  { key: "price", value: "Price", align: "right" },
  { key: "discount", value: "Discount", align: "right" },
  { key: "tax", value: "Tax %", align: "right" },
  { key: "status", value: "Status", align: "left" },
  { key: "", value: "Actions", align: "center" },
];
//
  return (
    <MainCard
      title={
        <Grid container spacing={2}>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h3"
            >
              Menu Items
            </Typography>

            <SearchField
              iconPrimary={SearchOutlinedIcon}
              placeholder="Search Item"
              sx={{
                width: '260px',
                height: '40px',
                marginLeft: '36px',
              }}
            />
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <CustomButton
              variant={'contained'}
              color={'secondary'}
                startIcon={<AddTwoToneIcon />}
              sx={{
                p: '12px 22px',
                height: '44px',
                width: '138px',
              }}
            >
              Add Item
            </CustomButton>
          </Grid>
        </Grid>
      } // MainCard opening tag closed here
    >
      <Grid container>
        <Grid item xs={12} display={"flex"}>
            <Grid item  xs={9}>
            <MultiSelectDropDown
            value={branchName}
            onChange={handleBranchChange}
            dropDownList={branches}
            sx={{ width: '160px', height: '40px' }}
          />
          <MultiSelectDropDown
            value={orderType}
            onChange={handleOrderTypeChange}
            dropDownList={ordersType}
            sx={{ width: '160px', height: '40px', ml: '8px' }}
          />
          <MultiSelectDropDown
            value={city}
            onChange={handleCityChange}
            dropDownList={cityList}
            sx={{ width: '160px', height: '40px', ml: '8px' }}
          />
          <MultiSelectDropDown
            value={orderStatus}
            onChange={handleStatusChange}
            dropDownList={status}
            sx={{ width: '130px', height: '40px', ml: '8px' }}
          />
            </Grid>
            <Grid item xs={3}>
            <Stack
                            spacing={0.5}
                            direction="row"
                            divider={
                              <Divider
                                orientation="vertical"
                                sx={{ border: "1px solid #EEEEEE",display:"flex" }}
                                
                                flexItem
                              />
                            }
                          >
                                <Stack
                                >
                                  <SortByAlphaIcon/>
                                </Stack>

                            <Stack
                           //   direction="row"
                             
                            >
                              <FilterListIcon
                              />
                            </Stack>  
                          </Stack>
            </Grid>
        </Grid>
      </Grid>
      <Grid container>
      <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{
                    mb: "20px",
                    color: "#212121",
                  }}
                >
                  {`400 Item(s)`}
                </Typography>
              </Grid>
      </Grid>
      <Box>
       <DragDropTableNew items={items} keysOfItems={keysOfItems}/>
      
      </Box>
    </MainCard>
  )
}

export default Items
