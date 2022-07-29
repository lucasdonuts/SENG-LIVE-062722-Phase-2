import React, { useState, useEffect } from 'react';
import ProjectForm from "./ProjectForm";
import ProjectList from "./ProjectList";
import ProjectEditForm from "./ProjectEditForm";

const ProjectsContainer = () => {
  const [projects, setProjects] = useState([]);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [selectedPhase, setSelectedPhase] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let url;
    if (selectedPhase && searchQuery) {
      url = `http://localhost:4000/projects?phase=${selectedPhase}&q=${encodeURI(searchQuery)}`;
    } else if (searchQuery) {
      url = `http://localhost:4000/projects?q=${encodeURI(searchQuery)}`;
    } else if (selectedPhase) {
      url = `http://localhost:4000/projects?phase=${selectedPhase}`;
    } else {
      url = "http://localhost:4000/projects";
    }
    fetch(url)
      .then((resp) => resp.json())
      .then((projects) => setProjects(projects));
  }, [selectedPhase, searchQuery]);

  const onAddProject = (newProj) => {
    setProjects((projects) => [...projects, newProj]);
  };

  const onUpdateProject = (updatedProject) => {
    setProjects(projects => projects.map(originalProject => {
      if (originalProject.id === updatedProject.id) {
        return updatedProject;
      } else {
        return originalProject;
      }
    }))
    setProjectToEdit(null);
  };

  const onProjectEdit = (projectToEdit) => {
    setProjectToEdit(projectToEdit);
  };

  const onProjectDelete = (projectId) => {
    setProjects(projects => projects.filter(p => p.id !== projectId))
  };

  const renderForm = () => {
    if (projectToEdit) {
      return (
        <ProjectEditForm
          projectToEdit={projectToEdit}
          onUpdateProject={onUpdateProject}
        />
      );
    } else {
      return <ProjectForm onAddProject={onAddProject} />;
    }
  };

  return (
    <div>
      {renderForm()}
      <ProjectList
        projects={projects}
        onProjectEdit={onProjectEdit}
        onProjectDelete={onProjectDelete}
        setSelectedPhase={setSelectedPhase}
        setSearchQuery={setSearchQuery}
      />
    </div>
  )
}

export default ProjectsContainer;