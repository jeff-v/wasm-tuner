This is very much a work-in-progress and is my first foray into the weird, wacky worlds of both WebAssembly and Rust.
This isn't working quite yet, but hot dang is it close.

Considering how unpolished the code is, it shouldn't surprise you that the build process suffers from a lack of polish too.
Before building, make sure you have yarn, the Rust compiler and the wasm-pack toolchain installed.

1. Enter the "wasm-audio" directory
2. Run "cargo build"
3. Run "wasm-pack build"
4. Change to the parent directory and run "yarn && yarn add ./wasm-audio/pkg". You'll need to run the "yarn add" step every time you make a change to your Rust code.
5. Finally, "yarn start" will get the project running locally.
