import express, {Request, Response} from "express"

const app =express();
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({success: true});
});

app.listen(3000, () => {
    console.log('Server is running at 3000');
});

app.post("/github-event", (req: Request, res: Response) => {
    const {body}= req;
    const {action, sender, repository} = body;
    const event = req.headers['x-github-event'];
    console.log(`Received event ${event} from ${sender.login} for repository ${repository.name}`);

    switch (event) {
        case "issues":
            console.log(`Action: ${action}`);
            break;
        case "push":
            console.log(`Commits: ${body.commits.length}`);
            break;
        case "star":
            console.log(`Starred by ${sender.login}`);
            break;
        default:
            console.log("Event not handled");
    }
});