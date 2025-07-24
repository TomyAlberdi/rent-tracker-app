interface AddRecordProps {
  propertyId: number
  month: number,
  year: number,
  income: number,
}

const AddRecord = ({
  propertyId,
  month,
  year,
  income,
}: AddRecordProps) => {
  //TODO: Implement AddRecord form (with update with props as default values)
  return (
    <div className="border border-red-500 w-1/2">
      {propertyId} {month} {year} {income}
    </div>
  )
}
export default AddRecord