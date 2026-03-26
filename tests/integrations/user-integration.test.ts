import { userInfo } from 'node:os'
import { conexao } from '../../src/config/database'
import { UserRepository } from '../../src/repositories/user_repo'

describe("Testes de integração de usuarios", () => {
    const repo = new UserRepository()
    beforeAll(async() => {
       
await conexao.execute('CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY AUTO_INCREMENT, nome VARCHAR(100) NOT NULL, email VARCHAR(100) NOT NULL UNIQUE); ')
    })
beforeEach(async () => {
    await conexao.execute('DELETE FROM users;')
})
test("Deve criar um usuário", async  () => {
    const user = await repo.inserir("Henrique", "henrique@teste.com")
    expect(user).not.toBeNull()
    expect(user.id).not.toBeNull()
    expect(user.nome).toBe("Henrique")
    expect(user.email).toBe("henrique@teste.com")
})
test("Deve criar dois usuários e exibir todos", async () => {
    const user1 = await repo.inserir("rodolfo", "rodolfo@teste.com")
     const user2 = await repo.inserir("rodolfro", "rodolfro@teste.com")
     expect((await repo.mostrarTodos()).length).toBe(2)
     const users = await repo.mostrarTodos()
     expect(users[0].nome).toBe("rodolfo")
     expect(users[1].nome).toBe("rodolfro")
})
afterAll(async () => {
    await conexao.end()
})
})