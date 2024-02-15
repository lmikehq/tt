import Text from './text';

export default function Required({ margin }: { margin?: string; }) {
  return (
    <Text
      type="p"
      weight="bold"
      text='*'
      color='red'
      margin={margin}
    />
  );
}
