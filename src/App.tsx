import "./App.css";
import SideBar from "./Modules/SideBar";
import ManageTask from "./Modules/ManageTask";

function App() {
  return (
    <section className="header row m-0">
      <div className="col-12 col-md-2">
        <SideBar />
      </div>
      <div className="col-12 col-md-10">
        <ManageTask />
      </div>
    </section>
  );
}

export default App;
