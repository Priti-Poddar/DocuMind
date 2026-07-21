import MainLayout from "../../components/layout/MainLayout";
import ChatWindow from "../../components/chat/ChatWindow";
import MessageInput from "../../components/chat/MessageInput";

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
