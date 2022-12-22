import React from 'react'

import { SelectChangeEvent } from '@mui/material/Select'
import { Typography, Grid } from '@mui/material'
import SearchField from 'components/SearchField'
import CustomButton from 'components/CustomButton'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone'
import MultiSelectDropDown from 'components/MultiSelectDropDown'
import { useTheme } from '@mui/material/styles'
import MainCard from 'components/cards/MainCard'

// dropdown data
const branches = [
  { label: 'All Branches', value: "1" },
  { label: 'Model Town Branch', value: "2" },
  { label: 'Johar Town Branch', value: "3" },
  { label: 'Iqbal Town Branch', value: "4" },
]

const ordersType = [
  { label: 'Orders Type', value: "1" },
  { label: 'Pickup', value: "2" },
  { label: 'Delivery', value: "3 "},
  { label: 'COD', value: "4" },
]

const Categories = () => {
  const [branchName, setBranchName] = React.useState<string[]>([
    branches[0].label,
  ])
  const [orderType, setOrderType] = React.useState<string[]>([
    ordersType[0].label,
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
              Categories
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
              //startIcon={<AddTwoToneIcon />}
              sx={{
                p: '12px 22px',
                height: '44px',
                width: '169px',
              }}
            >
              New Category
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
        </Grid>
      </Grid>
    </MainCard>
  )
}

export default Categories
