import { Switch, Route } from 'react-router-dom';
import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import ProjectsContainer from './components/ProjectsContainer';
import About from './components/About';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const onToggleDarkMode = () => {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  };

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/projects">
          <ProjectsContainer />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
