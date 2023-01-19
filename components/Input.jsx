import { useField } from "formik"

export const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div>
      <label className="flex flex-col font-semibold">
        {label}
        <input className="border" {...field} {...props} />
      </label>
      {meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  )
}
