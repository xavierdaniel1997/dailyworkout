import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const WorkoutDetails = ({workout}) => {
  const { dispatch } = useWorkoutsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }
    const response = await fetch('api/workouts/' + workout._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Beare ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className='workout-details'>
        <h4>{workout.title}</h4>
        <p><strong>Load (kg):</strong>{workout.load}</p>
        <p><strong>Reps:</strong>{workout.reps}</p>
        <p>{formatDistanceToNow(new Date(workout.createdAt) ,{addSuffix: true})}</p>
        <span className="deleteicon" onClick={handleClick}><DeleteOutlineIcon/></span>
    </div>
  )
}

export default WorkoutDetails
