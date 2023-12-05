import ProjectsSidebar from './components/ProjectsSidebar'
import NewProject from './components/NewProject'
import NoProjectSelected from './components/NoProjectSelected'

import { useState } from 'react'
import SelectedProject from './components/SelectedProject'

function App() {
	const [projectState, setProjectState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
	})

	const handleAddTask = text => {
		setProjectState(prevState => {
			const taskId = Math.random()
			const newTask = {
				text: text,
				projectId: prevState.selectedProjectId,
				id: taskId,
			}

			return {
				...prevState,
				tasks: [newTask, ...prevState.tasks],
			}
		})
	}

	const handleDeleteTask = id => {
		setProjectState(prevState => {
			return {
				...prevState,
				tasks: prevState.tasks.filter(task => task.id !== id),
			}
		})
	}

	const handleSeleusctProject = id => {
		setProjectState(prevState => {
			return { ...prevState, selectedProjectId: id }
		})
	}

	const handleStartAddProject = () => {
		setProjectState(prevState => {
			return { ...prevState, selectedProjectId: null }
		})
	}

	const handleDeleteProject = () => {
		setProjectState(prevState => {
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: prevState.projects.filter(project => project.id !== prevState.selectedProjectId),
			}
		})
	}

	const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)

	const handleCancelProject = () => {
		setProjectState(prevState => {
			return { ...prevState, selectedProjectId: undefined }
		})
	}

	const handleAddProject = projectData => {
		setProjectState(prevState => {
			const newProject = {
				...projectData,
				id: Math.random(),
			}
			return {
				...prevState,
				selectedProjectId: undefined,
				projects: [...prevState.projects, newProject],
			}
		})
	}
	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectState.tasks}
		/>
	)

	if (projectState.selectedProjectId === null) {
		content = (
			<NewProject
				onAdd={handleAddProject}
				onCancel={handleCancelProject}
			/>
		)
	} else if (projectState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
	}

	return (
		<main className='h-screen my-8 flex gap-8 '>
			<ProjectsSidebar
				onStartAddProject={handleStartAddProject}
				projects={projectState.projects}
				onSelectProject={handleSelectProject}
				selectedProjectId={projectState.selectedProjectId}
			/>
			{content}
		</main>
	)
}

export default App
