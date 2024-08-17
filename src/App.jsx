import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(false)
  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }

  }, [])

  const save_to_local_storage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  const togglefinished = (e) => {
    setshowfinished(!showfinished)
  }


  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    console.log(todos)
    save_to_local_storage()

  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newtodos)
    save_to_local_storage()
  }
  const handleDelete = (e, id) => {
    let c = confirm("Are you sure to delete todo?")
    console.log('c', c)
    if (c) {

      let newtodos = todos.filter(item => {
        return item.id !== id
      });
      settodos(newtodos)
      //  save_to_local_storage()
      localStorage.setItem("todos", JSON.stringify(newtodos));

    }
  }
  const handlechange = (e) => {
    settodo(e.target.value)
  }
  const handlebox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos)
    save_to_local_storage()

  }


  return (
    <>
      <Navbar />
      <div className="px-3 md:px-0">
        <div className=" container md:mx-auto bg-blue-200 my-5 rounded-xl p-5 min-h-[80vh] ">
          <div className="">
            <div className="addtodo my-5 ">
              <div className=" md:w-4/5 mx-auto">
                <h1 className="text-lg font-bold ">Add a Todo</h1>
              </div>
              <div className=" flex flex-col md:flex-row items-center justify-center">
                <input onChange={handlechange} value={todo} className='rounded-full px-3 py-1 w-full m-2 md:w-2/3 text-center' type="text" placeholder='Enter Your Task' />
                <button onClick={handleAdd} disabled={todo.length <= 0} className='bg-blue-600 text-white hover:bg-blue-800 rounded-lg px-5 py-2 md:py-1 mx-4 h-fit w-2/3 md:w-fit disabled:bg-blue-300'>Add</button>
              </div>
            </div>
            <div className=" md:w-4/5 mx-auto">
              <input onChange={togglefinished} type="checkbox" checked={showfinished} className='size-4' />  Show Finished Task
              <h1 className='text-lg font-bold'>Your todos</h1>
            </div>
            <div className="todos">
              {todos.length === 0 && <div className='text-center text-2xl '> <img className='mx-auto mix-blend-multiply brightness-150' src="https://irinaspage.com/wp-content/uploads/2018/02/do-nothing-sticky-note.jpg" alt="Your Schedule is Empty" /></div>}
              {todos.map(item => {
                return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex bg-blue-300 py-1 px-5 rounded-lg justify-between items-center my-2 transition-all md:w-4/5 mx-auto">
                  <div className="flex gap-4">
                    <div className="">
                      <input onChange={handlebox} className='size-5' type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                    </div>
                    <div className={item.isCompleted ? "line-through text-red-600" : ""}>{item.todo}</div>
                  </div>
                  <div className="buttons flex">
                    <button onClick={(e) => { handleEdit(e, item.id) }} className="bg-blue-600 p-0.5  rounded-lg hover:bg-blue-800 transition-all m-1">
                      <svg className='' xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffff"><path d="M160-120v-142l556.33-556q11.34-11.33 24-16.67Q753-840 766.67-840q13.33 0 25.83 5.33Q805-829.33 816-818l42 42q11.33 10.33 16.67 22.83 5.33 12.5 5.33 26.5 0 13-5.33 26-5.34 13-16.67 24.34L302-120H160Zm66.67-66.67h48l428.33-428L679-639l-24.33-24-428 428.33v48Zm587.33-539L765.67-774 814-725.67ZM679-639l-24.33-24L703-614.67 679-639ZM560-120q76.67 0 138.33-36.67Q760-193.33 760-260q0-38.67-26-69.67t-78.67-50l-51 51q41 11.34 65 30 24 18.67 24 38.67 0 29-39.16 51.17Q615-186.67 560-186.67q-13.67 0-23.5 9.5t-9.83 23.84q0 13.66 9.83 23.5Q546.33-120 560-120ZM221-418l52-52q-42.67-11.33-64.5-23.83-21.83-12.5-21.83-26.17 0-14.67 20.33-28.33Q227.33-562 291.33-587q84.67-33.33 113.34-62.67 28.66-29.33 28.66-69.66 0-55.67-42-88.17T280-840q-43 0-77.5 15t-52.17 37.33q-9 10.34-8 23.67 1 13.33 12.67 22 11 9 24.67 7.33 13.66-1.66 22.66-10.66 14.67-14.67 33-21.34 18.34-6.66 44.67-6.66 44.33 0 65.5 16t21.17 38q0 18-18.5 31.83-18.5 13.83-83.5 39.5-89.34 34.33-117 62.5Q120-557.33 120-520q0 32 24.33 59.5Q168.67-433 221-418Z" /></svg></button>
                    <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-blue-600 p-0.5  rounded-lg hover:bg-blue-800 transition-all m-1">

                      <svg className='' xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#ffff"><path d="M267.33-120q-27.5 0-47.08-19.58-19.58-19.59-19.58-47.09V-740H160v-66.67h192V-840h256v33.33h192V-740h-40.67v553.33q0 27-19.83 46.84Q719.67-120 692.67-120H267.33Zm425.34-620H267.33v553.33h425.34V-740Zm-328 469.33h66.66v-386h-66.66v386Zm164 0h66.66v-386h-66.66v386ZM267.33-740v553.33V-740Z" /></svg>
                    </button>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    <Footer/>
    </>
  )
}

export default App
