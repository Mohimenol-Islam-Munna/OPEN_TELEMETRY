import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [userList, setUserList] = useState({
    isLoading: false,
    data: null,
    error: null,
  });

  const [data, setData] = useState({
    isLoading: false,
    data: null,
    error: null,
  });

  const [user, setUser] = useState({
    id: "",
    isLoading: false,
    data: null,
    error: null,
  });

  const fetchUserHandler = async (id) => {
    setUser((prev) => {
      return {
        ...prev,
        id: id,
      };
    });
  };

  const fetchDataHandler = async (id) => {
    setData((prev) => {
      return {
        ...prev,
        isLoading: true,
        data: null,
        error: null,
      };
    });

    try {
      const res = await axios.get(`http://localhost:5000`);

      setData((prev) => {
        return {
          ...prev,
          isLoading: false,
          data: res.data,
          error: null,
        };
      });
    } catch (err) {
      setData((prev) => {
        return {
          ...prev,
          isLoading: false,
          data: null,
          error: err,
        };
      });
    }
  };

  useEffect(() => {
    setUserList((prev) => {
      return {
        ...prev,
        isLoading: true,
      };
    });

    const fetchData = async () => {
      try {
        const res = await axios.get("https://reqres.in/api/users?page=2");

        setUserList((prev) => {
          return {
            ...prev,
            isLoading: false,
            data: res.data,
            error: null,
          };
        });
      } catch (err) {
        setUserList((prev) => {
          return {
            ...prev,
            isLoading: false,
            data: null,
            error: err,
          };
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user.id) {
      const fetchdata = async () => {
        setUser((prev) => {
          return {
            ...prev,
            isLoading: true,
            data: null,
            error: null,
          };
        });

        try {
          const res = await axios.get(`https://reqres.in/api/users/${user.id}`);

          setUser((prev) => {
            return {
              ...prev,
              isLoading: false,
              data: res.data,
              error: null,
            };
          });
        } catch (err) {
          setUser((prev) => {
            return {
              ...prev,
              isLoading: false,
              data: null,
              error: err,
            };
          });
        }
      };

      fetchdata();
    }
  }, [user.id]);

  return (
    <div>
      <h2 style={{ marginTop: "50px", textAlign: "center" }}>
        OpenTelemetry in React Js.
      </h2>
      <h3 style={{ textAlign: "center" }}>Used for observability</h3>
      <div>
        {userList.isLoading && <h2 style={{ textAlign: "center" }}>Loading</h2>}
        {!userList.isLoading && userList.error && (
          <h2 style={{ textAlign: "center" }}>Somthing Wrong</h2>
        )}
        {!userList.isLoading &&
          !userList.error &&
          userList.data?.data &&
          userList.data.data.map((item, index) => (
            <div
              key={index}
              style={{
                boder: "1px solid palegreen",
                borderRadius: "8px",
                background: "lightgrey",
                margin: "10px 0px",
                padding: "20px 10px",
                textAlign: "center",
              }}
            >
              <h3>
                Name: {item.first_name} {item.last_name}{" "}
              </h3>
              <p>Email: {item.email} </p>

              <div>
                {user.id === item.id ? (
                  <>
                    {user.isLoading && (
                      <h2 style={{ textAlign: "center" }}>Loading ...</h2>
                    )}

                    {!user.isLoading && user.error && (
                      <>
                        <h2 style={{ textAlign: "center" }}>Somthing Wrong</h2>
                        <div>
                          <button
                            style={{
                              boder: "1px solid palegreen",
                              borderRadius: "5px",
                              background: "lightgrey",
                              margin: "10px 0px",
                              padding: "10px 10px",
                              textAlign: "center",
                            }}
                            type="button"
                            onClick={() => fetchUserHandler(item.id)}
                          >
                            Try Again
                          </button>
                        </div>
                      </>
                    )}

                    {!user.isLoading && !user.error && user.data?.data && (
                      <img
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                        }}
                        src={`${user.data?.data?.avatar}`}
                      />
                    )}
                  </>
                ) : (
                  <button
                    style={{
                      boder: "1px solid palegreen",
                      borderRadius: "5px",
                      background: "lightgrey",
                      margin: "10px 0px",
                      padding: "10px 10px",
                      textAlign: "center",
                    }}
                    type="button"
                    onClick={() => fetchUserHandler(item.id)}
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      <div style={{ marginBottom: "50px" }}>
        <button
          style={{
            boder: "1px solid palegreen",
            borderRadius: "5px",
            background: "lightgrey",
            margin: "10px 0px",
            padding: "10px 10px",
            textAlign: "center",
          }}
          type="button"
          onClick={fetchDataHandler}
        >
          Click TO Get From Backend
        </button>
        <h4>{data?.data?.message || ""}</h4>
        <h4>{data.error && "Ops! Somthing Wrong"}</h4>
      </div>
    </div>
  );
}

export default App;
