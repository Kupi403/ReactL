import { useState, useRef } from 'react'
import Input from './Input'
import Modal from './Modal'

const NewProject = ({ onAdd, onCancel }) => {
	const modal = useRef()

	const title = useRef()
	const description = useRef()
	const date = useRef()

	function handleSave() {
		const enteredTitle = title.current.value
		const enteredDescription = description.current.value
		const enteredDate = date.current.value

		if (enteredTitle.trim() === '' || enteredDescription.trim() === '' || enteredDate.trim() === '') {
			modal.current.open()
			return
		}
		onAdd({
			title: enteredTitle,
			description: enteredDescription,
			date: enteredDate,
		})
	}

	return (
		<>
			<Modal
				ref={modal}
				buttonCaption={'Okay'}>
				<h2 className='text-xl font-bold text-stone-700 my-4'>Invalid input</h2>
				<p className='text-stone-600 mb-4'>Oops... looks like you forgot to enteer a value.</p>
			</Modal>
			<div className='w-[35rem] mt-16'>
				<menu className='flex items-center justify-end gap-4 my-4'>
					<li>
						<button
							className='text-stone-800 hover:text-stone-950'
							onClick={onCancel}>
							Cancel
						</button>
					</li>
					<li>
						<button
							className='px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950'
							onClick={handleSave}>
							Save
						</button>
					</li>
				</menu>
				<div className=''>
					<Input
						type='text'
						ref={title}
						label={'Title'}></Input>
					<Input
						ref={description}
						label={'Description'}
						textarea></Input>
					<Input
						ref={date}
						type='date'
						label={'Due Date'}></Input>
				</div>
			</div>
		</>
	)
}

export default NewProject
