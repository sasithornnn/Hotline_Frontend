"use server"

export async function handleLogin(formData: any) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const users = [
    { username: "admin", password: "123456", name: "Admini", email: "admin@gmail.com", role: "admin" },
    { username: "user1", password: "password123", name: "Sasitorn", email: "Sasitorn@gmail..com", role: "user" }
  ];

  const user = users.find(u => u.username === formData.username && u.password === formData.password);

  if (user) {
    return { 
      success: true, 
      message: `ยินดีต้อนรับคุณ ${user.name}`,
      user: { name: user.name, email: user.email, role: user.role }
    };
  } else {
    return { success: false, message: "Username หรือ Password ไม่ถูกต้อง" };
  }
}