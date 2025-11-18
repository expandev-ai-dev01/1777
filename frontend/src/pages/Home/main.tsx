export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Validador de Senhas</h2>
        <p className="text-center text-gray-600">
          Bem-vindo ao sistema de validação de senhas. Aqui você pode verificar a força da sua
          senha.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
