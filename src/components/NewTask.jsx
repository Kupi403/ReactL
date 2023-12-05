import { useState, useRef } from 'react'
import Modal from './Modal'

const NewTask = ({ onAdd }) => {
	const [enteredTask, setEnteredTask] = useState('')
	const modal = useRef()

	const handleChange = e => {
		setEnteredTask(e.target.value)
	}
	const handleClick = () => {
		if (enteredTask.trim() === '') {
			return modal.current.open()
		}
		onAdd(enteredTask)
		setEnteredTask('')
	}

	return (
		<>
			<Modal
				ref={modal}
				buttonCaption={'Okay'}>
				<h2 className='text-xl font-bold text-stone-700 my-4'>Invalid input</h2>
				<p className='text-stone-600 mb-4'>Oops... looks like you forgot to enteer a value.</p>
			</Modal>
			<div className='flex items-center gap-4'>
				<input
					type='text'
					className='w-64 px-2 py-1 rounded-sm bg-stone-200'
					onChange={handleChange}
					value={enteredTask}
				/>
				<button
					className='text-stone-700 hover:text-stone-950'
					onClick={handleClick}>
					Add task
				</button>
			</div>
		</>
	)
}

export default NewTask
