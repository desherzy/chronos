import React from 'react';
import '../styles/tailwind.css';
import useAuthStore from '../store/auth';

function Sidebar() {
    const { logoutUser } = useAuthStore();

    const handleLogout = async () => {
        try {
          await logoutUser();
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
  return (
    <div className="fixed left-0 top-0 h-full flex flex-col justify-start items-center px-1 max-w-[68px] bg-white border border-solid border-zinc-400">
      <div className="flex flex-col items-center pt-2 pb-6">

        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/253642aeea53a52d8d5d8a266cb9cef9727d30edf34568bd1a6c8b26fdc4381b?apiKey=3a300688337b47bab8a9229c550bc59a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/253642aeea53a52d8d5d8a266cb9cef9727d30edf34568bd1a6c8b26fdc4381b?apiKey=3a300688337b47bab8a9229c550bc59a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/253642aeea53a52d8d5d8a266cb9cef9727d30edf34568bd1a6c8b26fdc4381b?apiKey=3a300688337b47bab8a9229c550bc59a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/253642aeea53a52d8d5d8a266cb9cef9727d30edf34568bd1a6c8b26fdc4381b?apiKey=3a300688337b47bab8a9229c550bc59a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/253642aeea53a52d8d5d8a266cb9cef9727d30edf34568bd1a6c8b26fdc4381b?apiKey=3a300688337b47bab8a9229c550bc59a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/253642aeea53a52d8d5d8a266cb9cef9727d30edf34568bd1a6c8b26fdc4381b?apiKey=3a300688337b47bab8a9229c550bc59a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/253642aeea53a52d8d5d8a266cb9cef9727d30edf34568bd1a6c8b26fdc4381b?apiKey=3a300688337b47bab8a9229c550bc59a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/253642aeea53a52d8d5d8a266cb9cef9727d30edf34568bd1a6c8b26fdc4381b?apiKey=3a300688337b47bab8a9229c550bc59a&"
          className="w-15 aspect-[0.71] "
        />
        <div className="shrink-0 self-stretch mt-10 h-px bg-black" />
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/4a02eeac9dac25545510208e8d93ca3282507096923707b616b4ab19a371996d?apiKey=3a300688337b47bab8a9229c550bc59a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a02eeac9dac25545510208e8d93ca3282507096923707b616b4ab19a371996d?apiKey=3a300688337b47bab8a9229c550bc59a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a02eeac9dac25545510208e8d93ca3282507096923707b616b4ab19a371996d?apiKey=3a300688337b47bab8a9229c550bc59a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a02eeac9dac25545510208e8d93ca3282507096923707b616b4ab19a371996d?apiKey=3a300688337b47bab8a9229c550bc59a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a02eeac9dac25545510208e8d93ca3282507096923707b616b4ab19a371996d?apiKey=3a300688337b47bab8a9229c550bc59a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a02eeac9dac25545510208e8d93ca3282507096923707b616b4ab19a371996d?apiKey=3a300688337b47bab8a9229c550bc59a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a02eeac9dac25545510208e8d93ca3282507096923707b616b4ab19a371996d?apiKey=3a300688337b47bab8a9229c550bc59a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4a02eeac9dac25545510208e8d93ca3282507096923707b616b4ab19a371996d?apiKey=3a300688337b47bab8a9229c550bc59a&"
          className="mt-11 w-9 aspect-[0.9]"
        />
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3d80e1aa88ee4aef61a4532ca0c3f055014cc063cb25db723936eecfd720ba65?apiKey=3a300688337b47bab8a9229c550bc59a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d80e1aa88ee4aef61a4532ca0c3f055014cc063cb25db723936eecfd720ba65?apiKey=3a300688337b47bab8a9229c550bc59a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d80e1aa88ee4aef61a4532ca0c3f055014cc063cb25db723936eecfd720ba65?apiKey=3a300688337b47bab8a9229c550bc59a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d80e1aa88ee4aef61a4532ca0c3f055014cc063cb25db723936eecfd720ba65?apiKey=3a300688337b47bab8a9229c550bc59a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d80e1aa88ee4aef61a4532ca0c3f055014cc063cb25db723936eecfd720ba65?apiKey=3a300688337b47bab8a9229c550bc59a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d80e1aa88ee4aef61a4532ca0c3f055014cc063cb25db723936eecfd720ba65?apiKey=3a300688337b47bab8a9229c550bc59a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d80e1aa88ee4aef61a4532ca0c3f055014cc063cb25db723936eecfd720ba65?apiKey=3a300688337b47bab8a9229c550bc59a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3d80e1aa88ee4aef61a4532ca0c3f055014cc063cb25db723936eecfd720ba65?apiKey=3a300688337b47bab8a9229c550bc59a&"
          className="mt-14 w-9 aspect-[0.9]"
        />
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bc8606c0d8dab3cfaf56dce2a6574894c680aafcc23f88d1bbc3f77e400cc3d7?apiKey=3a300688337b47bab8a9229c550bc59a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc8606c0d8dab3cfaf56dce2a6574894c680aafcc23f88d1bbc3f77e400cc3d7?apiKey=3a300688337b47bab8a9229c550bc59a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc8606c0d8dab3cfaf56dce2a6574894c680aafcc23f88d1bbc3f77e400cc3d7?apiKey=3a300688337b47bab8a9229c550bc59a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc8606c0d8dab3cfaf56dce2a6574894c680aafcc23f88d1bbc3f77e400cc3d7?apiKey=3a300688337b47bab8a9229c550bc59a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc8606c0d8dab3cfaf56dce2a6574894c680aafcc23f88d1bbc3f77e400cc3d7?apiKey=3a300688337b47bab8a9229c550bc59a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc8606c0d8dab3cfaf56dce2a6574894c680aafcc23f88d1bbc3f77e400cc3d7?apiKey=3a300688337b47bab8a9229c550bc59a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc8606c0d8dab3cfaf56dce2a6574894c680aafcc23f88d1bbc3f77e400cc3d7?apiKey=3a300688337b47bab8a9229c550bc59a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc8606c0d8dab3cfaf56dce2a6574894c680aafcc23f88d1bbc3f77e400cc3d7?apiKey=3a300688337b47bab8a9229c550bc59a&"
          className="mt-16 w-9 aspect-[0.9]"
        />

      </div>
      <div className="mt-auto mb-12">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1628e6e1eed84d932c2c781ad4fa66b2c4a99b3d4565f22873f7cda52117fc42?apiKey=3a300688337b47bab8a9229c550bc59a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1628e6e1eed84d932c2c781ad4fa66b2c4a99b3d4565f22873f7cda52117fc42?apiKey=3a300688337b47bab8a9229c550bc59a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1628e6e1eed84d932c2c781ad4fa66b2c4a99b3d4565f22873f7cda52117fc42?apiKey=3a300688337b47bab8a9229c550bc59a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1628e6e1eed84d932c2c781ad4fa66b2c4a99b3d4565f22873f7cda52117fc42?apiKey=3a300688337b47bab8a9229c550bc59a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1628e6e1eed84d932c2c781ad4fa66b2c4a99b3d4565f22873f7cda52117fc42?apiKey=3a300688337b47bab8a9229c550bc59a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1628e6e1eed84d932c2c781ad4fa66b2c4a99b3d4565f22873f7cda52117fc42?apiKey=3a300688337b47bab8a9229c550bc59a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1628e6e1eed84d932c2c781ad4fa66b2c4a99b3d4565f22873f7cda52117fc42?apiKey=3a300688337b47bab8a9229c550bc59a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1628e6e1eed84d932c2c781ad4fa66b2c4a99b3d4565f22873f7cda52117fc42?apiKey=3a300688337b47bab8a9229c550bc59a&"
          className="mt-64 aspect-square w-[29px]"
          onClick={handleLogout}
        />
        </div>
    </div>
  );
}

export default Sidebar;