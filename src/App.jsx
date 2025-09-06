import { useBindingState } from './BindingState.jsx';

function App() {
  const state = useBindingState();

  // if (state.abc === undefined) {
  //   console.log('recreate state');
  //   state.abc = {
  //     a: 1,
  //     b: 1,
  //     c: {
  //       a: 1,
  //       c: {
  //         a: 1,
  //         c: {
  //           a: 1
  //         }
  //       }
  //     }
  //   };
  // }

  console.log('render');
  return (
    <>
      <h1>Count:{state.count}</h1>
      {/* <h1>Counter:{state.counter.count}</h1> */}
      {/* <h1>ABC:{state.abc.c.c.c.a}</h1> */}
      <button onClick={() => {
        state.count++;
        // state.counter.count += 2;
        // state.abc.c.c.c.a += 3;
      }}>
        Increment
      </button>
    </>
  )
}

export default App
