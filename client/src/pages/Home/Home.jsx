import MainLayout from "../../components/Layout/MainLayout";
import ChatWindow from "../../components/Chat/ChatWindow";
import MessageInput from "../../components/Chat/MessageInput";

const Home = () => {
  return (
    <MainLayout>
      <div className="flex flex-col h-full">
        <ChatWindow />

        <MessageInput />
      </div>
    </MainLayout>
  );
};

export default Home;
