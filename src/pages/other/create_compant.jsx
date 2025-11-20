function UserProfile() {
    const user = {
        name: '张三',
        age: 18,
        location: '中国',
    };

    return (
        <div>
            <h2>{user.name}</h2>
            <p>年龄：{user.age}</p>
            <p>位置：{user.location}</p>
        </div>
    )

}

export default UserProfile;


