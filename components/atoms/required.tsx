import Text from './text'

export default function Required() {
  return (
    <Text
        type="p"
        weight="bold"
        text='*'
        color='red'
    />
  )
}
