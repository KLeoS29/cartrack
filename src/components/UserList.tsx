import React, { useState, useEffect } from "react";

interface IUser {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

const UserList: React.FC = (): React.ReactElement => {
    const [users, setUsers] = useState<Array<IUser>>([]);
    const [filteredUsers, setfilteredUsers] = useState<Array<IUser>>([]);
    const [searchString, setsearchString] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(users => {
            setUsers(users as Array<IUser>)
            setfilteredUsers(users as Array<IUser>);
        })
        .catch(e => {
            console.log(e);
        });
    };

    const onSearchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchString = event.target.value;
        setsearchString(searchString);
    };

    const onKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            search();
        }
    };

    const search = () => {
        const value = searchString.toLowerCase();
        let result = [];
        result = users.filter((data) => JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1);
        setfilteredUsers(result);
    }

    return (
        <div className="container">
            <div className="search">
                <input
                    type="text"
                    className="searchTerm"
                    placeholder="Search keyword"
                    value={searchString}
                    onChange={onSearchHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button
                    className="searchButton"
                    type="button"
                    onClick={search}
                >
                    Search
                </button>
            </div>
            <div className="usersTable">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Website</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length != 0 && filteredUsers.map((user, index) => (
                            <tr key={index}>
                                <td data-label="Name" >{user.name}</td>
                                <td data-label="Username">{user.username}</td>
                                <td data-label="Email">
                                    <a href={"mailto:" + user.email} className="email">
                                        {user.email}
                                    </a>
                                </td>
                                <td data-label="Address">
                                    <span className="address">
                                        {user.address.suite}, {user.address.street}
                                    </span>
                                    <span className="address">
                                        {user.address.city}, {user.address.zipcode}
                                    </span>
                                    <small>
                                        <span className="address">
                                            {user.address.geo.lat}, {user.address.geo.lng}
                                        </span>
                                    </small>
                                </td>
                                <td data-label="Phone">
                                    <a href={"tel:" + user.phone} className="phone">
                                        {user.phone}
                                    </a>
                                </td>
                                <td data-label="Website">{user.website}</td>
                                <td data-label="Company">
                                    <span className="companyName">{user.company.name}</span>
                                    <span className="companyPhrase">{user.company.catchPhrase}</span>
                                    <span className="companyBs"><small>{user.company.bs}</small></span>
                                </td>
                            </tr>
                        )) ||
                            <tr>
                                <td colSpan={7} className="noResult">No Result</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;