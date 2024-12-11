
type Props = {
  q: string,
}


async function SearchPageHeader({ q }: Props) {


  return (
    <div className="border p-2">
      <p className="font-semibold text-opacity">
        Search Results for:&nbsp;
        <span className="font-bold ">{q}</span>
      </p>
    </div>
  )
}

export default SearchPageHeader
