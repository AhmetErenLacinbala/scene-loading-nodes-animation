import React, { useEffect, useState } from 'react';
import Circle from './circle/circle.js';

const initialCircles = [
  {
    deleteNode: false,
    checked: false,
    mesh: false,
    id: 0,
    layer: 0,
    text: "root",
    color: "gray",
    next: [1, 2, 3, 4],
    loc: {
      x: 50,
      y: 6
    },
  },
  {
    deleteNode: false,
    checked: false,
    mesh: false,
    id: 1,
    layer: 1,
    text: "Camera",
    color: "gray",
    next: [],
    loc: {
      x: 10,
      y: 20
    }
  },
  {
    deleteNode: false,
    checked: false,
    mesh: false,
    id: 2,
    layer: 1,
    text: "Empty",
    color: "gray",
    next: [5, 6],
    loc: {
      x: 35,
      y: 20
    }
  },
  {
    deleteNode: false,
    checked: false,
    mesh: false,
    id: 3,
    layer: 1,
    text: "Empty",
    color: "gray",
    next: [7, 8],
    loc: {
      x: 65,
      y: 20
    }
  },
  {
    deleteNode: false,
    checked: false,
    mesh: false,
    id: 4,
    layer: 1,
    text: "Empty",
    color: "gray",
    next: [9],
    loc: {
      x: 90,
      y: 20
    }
  },
  //---------------------------------------
  {
    deleteNode: false,
    checked: false,
    mesh: false,
    id: 5,
    layer: 2,
    text: "Armature",
    color: "gray",
    next: [],
    loc: {
      x: 27,
      y: 40
    }
  },

  {
    deleteNode: false,
    checked: false,
    mesh: true,
    id: 6,
    layer: 2,
    text: "Cube",
    color: "gray",
    next: [],
    loc: {
      x: 43,
      y: 40
    }
  },

  {
    deleteNode: false,
    checked: false,
    mesh: false,
    id: 7,
    layer: 2,
    text: "Camera 2",
    color: "gray",
    next: [],
    loc: {
      x: 57,
      y: 40
    }
  },

  {
    deleteNode: false,
    checked: false,
    mesh: false,
    id: 8,
    layer: 2,
    text: "Armature",
    color: "gray",
    next: [],
    loc: {
      x: 73,
      y: 40
    }
  },
  {
    deleteNode: false,
    checked: false,
    mesh: true,
    id: 9,
    layer: 2,
    text: "Skybox",
    color: "gray",
    next: [],
    loc: {
      x: 90,
      y: 40
    },
  },
]


const App = () => {
  const [circles, setCircles] = useState([...initialCircles]);
  const [current, setCurrent] = useState({
    current: {
      ...circles[0]
    },
    nextIndex: -1,
    path: [0]
  });

  useEffect(() => {
    function handleKeyPress(e) {
      if (e.key === "ArrowRight") {
        setCurrent((prev) => {
          if (prev.nextIndex < prev.current.next.length - 1) {
            const newNextIndex = prev.nextIndex + 1;
            const nextId = prev.current.next[newNextIndex];
            const nextTemp = circles.find(circle => circle.id === nextId);

            setCircles((prevCircles) => prevCircles.map(circle => {
              if (circle.id === nextTemp.id) {
                return { ...circle, checked: true };
              }
              return circle;
            }));


            if (!nextTemp.mesh && nextTemp.next.length === 0) {
              setCircles((prev) => prev.map(circle => {
                if (circle.id === nextTemp.id) {
                  return { ...circle, deleteNode: true, }
                }
                return { ...circle }
              }))
            }


            return {
              current: { ...nextTemp },
              nextIndex: -1,
              path: [...prev.path, nextTemp.id],
            };
          } else {
            if (prev.path.length > 1) {
              const newPath = [...prev.path];
              const currentId = newPath.pop();
              const parentId = newPath[newPath.length - 1];
              const parentTemp = circles.find(circle => circle.id === parentId);
              const parentNextIndex = parentTemp.next.indexOf(currentId);
              const children = circles.filter(circle => parentTemp.next.includes(circle.id));

              if (children.every(child => child.deleteNode)) {
                setCircles((prev) => prev.map(circle => {
                  if (circle.id === parentTemp.id) {
                    return { ...circle, deleteNode: true }
                  }
                  return { ...circle }
                }))
              }

              return {
                current: { ...parentTemp },
                nextIndex: parentNextIndex,
                path: newPath,
              };
            }
          }
          return prev;
        });
      }
    }

    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [circles]);


  return (
    <div style={{
      width: "100%",
      height: "100vh"
    }}>
      <svg viewBox="0 0 100 100">
        {circles.map((circle, key) => {
          let nextData = circle.next.map((thisNext) => {
            return circles.find(c => c.id === thisNext)
          })
          return <Circle
            key={key + 30}
            current={current}
            setCurrent={setCurrent}
            data={circle}
            nextData={nextData} />
        })}

      </svg>
    </div>
  );
}

export default App;
