import React from 'react'

import { Typography, Grid } from '@mui/material'
import { SelectChangeEvent } from '@mui/material/Select'

import SearchField from 'uiComponent/SearchField'
import CustomButton from 'uiComponent/CustomButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import MultiSelectDropDown from 'uiComponent/MultiSelectDropDown'

import MainCard from 'uiComponent/cards/MainCard'

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
              sx={{
                fontFamily: 'Roboto',
                fontStyle: 'normal',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '28px',
                color: '#212121',
              }}
            >
              Items
            </Typography>

            <SearchField
              iconPrimary={SearchOutlinedIcon}
              placeholder="Search Order"
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
              //    startIcon={<AddTwoToneIcon />}
              sx={{
                p: '12px 22px',
                height: '44px',
                width: '137px',
              }}
            >
              New Item
            </CustomButton>
          </Grid>
        </Grid>
      } // MainCard opening tag closed here
    >
      <Grid container>
        <Grid item xs={12}>
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
      </Grid>
    </MainCard>
  )
}

export default Items
