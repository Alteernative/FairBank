import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

// Creating cookies object
const cookies = new Cookies();

interface AppState {
  username: string;
  password: string;
  error: string;
  isAuthenticated: boolean;
}

const App = () => {
  const [state, setState] = useState<AppState>({
    username: "",
    password: "",
    error: "",
    isAuthenticated: false,
  });

  // Get Session Method
  const getSession = () => {
    fetch("/api/session/", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthenticated) {
          setState({ ...state, isAuthenticated: true });
        } else {
          setState({ ...state, isAuthenticated: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSession();
  }, []);

  // Who Am I method
  const whoami = () => {
    fetch("/api/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You are logged in as: " + data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: event.target.value });
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, username: event.target.value });
  };

  const isResponseOk = (response: Response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  };

  // Login Method
  const login = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch("/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": cookies.get("csrftoken"),
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username: state.username,
        password: state.password,
      }),
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setState({
          ...state,
          isAuthenticated: true,
          username: "",
          password: "",
          error: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, error: "Wrong username or password." });
      });
  };

  // Logout Method
  const logout = () => {
    fetch("/api/logout", {
      credentials: "same-origin",
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setState({ ...state, isAuthenticated: false });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!state.isAuthenticated) {
    return (
      <div className="container mt-3">
        <h1>React Cookie Auth</h1>
        <br />
        <h2>Login</h2>
        <form onSubmit={login}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={state.username}
              onChange={handleUserNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={state.password}
              onChange={handlePasswordChange}
            />
            <div>
              {state.error && (
                <small className="text-danger">{state.error}</small>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
  return (
    <div className="container mt-3">
      <h1>React Cookie Auth</h1>
      <p>You are logged in!</p>
      <button className="btn btn-primary mr-2" onClick={whoami}>
        WhoAmI
      </button>
      <button className="btn btn-danger" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default App;