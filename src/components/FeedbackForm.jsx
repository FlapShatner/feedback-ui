import { useState } from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'

function FeedbackForm({ handleAdd }) {
  const [text, setText] = useState('')
  const [rating, setRating] = useState(10)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleTextChange = ({ target: { value } }) => {
    if (value === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (value !== '' && value.trim().length <= 10) {
      setBtnDisabled(true)
      setMessage('Must be at least 10 characters')
    } else {
      setBtnDisabled(false)
      setMessage(null)
    }

    setText(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      }
      handleAdd(newFeedback)

      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your experience with us?</h2>
        <RatingSelect select={setRating} selected={rating} />
        <div className='input-group'>
          <input onChange={handleTextChange} type='text' placeholder='Write a review' value={text} />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}
export default FeedbackForm
