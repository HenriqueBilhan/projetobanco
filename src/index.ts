import { UserRepository } from "./repositories/user_repo";

async function main() {
      const userRepo = new UserRepository()
        console.log(await userRepo.inserir("Henrique", "davibritto2333@teste.com"))
        console.log(await userRepo.inserir("timoteo", "bundo3@teste.com"))
        console.log('---------------------------------------')
        console.log(await userRepo.mostrarTodos())
}

main()