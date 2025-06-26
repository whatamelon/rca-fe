import './css/spinner.css'

export function Spinner({ color = '#d1d1d1' }: { color?: string }) {
  return <div className="spinner" style={color !== null ? { borderColor: color } : {}} />
}
