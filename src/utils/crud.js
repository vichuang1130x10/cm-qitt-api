// temporarily set the date to 2020-01-01, it will be update in the futures
const dateString = '2020-01-01 00:00:00.000'

export const fetchCmData = model => async (req, res) => {
  try {
    const yieldRate = await model.query(
      `select * from CM_YieldRate where Vendor = '${req.params.id}' and Date >= '${dateString}' `
    )
    const errorList = await model.query(
      `select * from CM_ErrorList where Vendor = '${req.params.id}' and Date >= '${dateString}' `
    )

    const repairList = await model.query(
      `select * from CM_RepairList where Vendor = '${req.params.id}' and Date >= '${dateString}' `
    )

    if (!yieldRate || !errorList || !repairList) {
      return res.status(400).end()
    }

    res
      .status(200)
      .json({ yieldRate, errorList, repairList })
      .end()
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

const stringTransform = str => {
  const [month, day, year] = str.split('/')
  return `${year}-${month}-${day} 00:00:00.000`
}

export const fetchCmDataByDate = model => async (req, res) => {
  const startDate = stringTransform(req.query.startDate)
  const endDate = stringTransform(req.query.endDate)
  try {
    const yieldRate = await model.query(
      `select * from CM_YieldRate where Vendor = '${req.params.id}' and Date >= '${startDate}' and Date <= '${endDate}'  `
    )
    const errorList = await model.query(
      `select * from CM_ErrorList where Vendor = '${req.params.id}' and Date >= '${startDate}' and Date <= '${endDate}' `
    )

    const repairList = await model.query(
      `select * from CM_RepairList where Vendor = '${req.params.id}' and Date >= '${startDate}' and Date <= '${endDate}' `
    )

    if (!yieldRate || !errorList || !repairList) {
      return res.status(400).end()
    }

    res
      .status(200)
      .json({ yieldRate, errorList, repairList })
      .end()
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

//  console.log('fetch start')
// console.log(req.params.id)
// console.log(req.query.startDate)
// console.log(req.query.endDate)

export const crudControllers = model => ({
  fetchCmData: fetchCmData(model),
  fetchCmDataByDate: fetchCmDataByDate(model)
})
