import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { loadShows } from "../../store/shows"
import { useSelector } from "react-redux"
import './shows.css'


export default function Shows() {
    const shows = useSelector(state => Object.values(state.shows))
    const dispatch = useDispatch()

    console.log(shows)
    
    useEffect(() => {
        dispatch(loadShows())
    }, [dispatch])


    return (
        <div className="outer-show">
        {shows && shows.map(show => {
            const dateTime = new Date(show.dateTime)
            const dateOptions = { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' };
            return (
            <div key={show.id} className="card-container">
            <div className="left-side">
                <div >{dateTime.toLocaleString('en-US', dateOptions)}</div>
                <div >{show.venue}</div>
            </div>
            </div>
            )
        })}
    </div>
  )
}
