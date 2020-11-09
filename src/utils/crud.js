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

export const crudControllers = model => ({
  fetchCmData: fetchCmData(model)
})
