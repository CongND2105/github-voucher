function MyButton(){
    return(
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Test</button>
    );
}

export default function MyApp(){
    return(
        <div>
            <h1 class="text-3xl font-bold underline">
                Wellcome to my App
            </h1>
            <MyButton />
        </div>
    );
}