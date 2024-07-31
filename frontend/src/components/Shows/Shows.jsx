import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadShows } from "../../store/shows"
import { useSelector } from "react-redux"


export default function Shows() {
    const shows = useSelector(state => Object.values(state.shows))
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(loadShows())
    }, [dispatch])
  return (
    <div>
        {shows && shows.map(show => (
            <div key={show.id}>{show.venue}</div>
        ))}
    </div>
  )
}
