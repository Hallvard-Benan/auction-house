# Auction House, Semester project 2

![image](/public/screenshot.png)

- Deployed site: https://the-auctionhouse.netlify.app/
- Design and style guide: https://www.figma.com/file/QbxlW4nP2YjA6jzddi7WeO/Semester-project-2?type=design&node-id=0%3A1&mode=design&t=T55NYV0f9n0vTfdJ-1

Auction House is auction website, where users can view, post and bid on listings.

## Built with

- ReactJs https://react.dev/
- Vite https://vitejs.dev/
- TailwindCSS https://tailwindcss.com/
- Components from ShadCN https://ui.shadcn.com/
- Toast components from: Sonner https://sonner.emilkowal.ski/
- Icons from: React icons https://react-icons.github.io/react-icons/
- TanStack Query https://tanstack.com/query/latest
- TanStack Router https://tanstack.com/router/v1

## Features

- Registration with a @stud.noroff.no email
- Search, sort and filter listings, toggle between all or active listings only, or search by tag.
- Bidding on listings
- viewing a listings bid history
- Fully responsive
- viewing individual listing
- listing image gallery
- Change user avatar and view your credits in your profile page
- view other profiles

## Getting started

### Installing

```bash
git clone git@github.com:Hallvard-Benan/auction-house.git
```

Install dependencies

```bash
npm i
```

### Running

First create a file in the root of the project called ".env.local" and paste this: VITE_API_URL="https://api.noroff.dev/api/v1/auction"

then:

```bash
npm run dev
```

### Testing

First create an account to use for testing.
Then create a file in the root of the project called "cypress.env.json".

Paste this:
{ "email": "\_EMAIL", "password": "\_PASSWORD" }

And replace \_EMAIL and \_PASSWORD with your test account details.

### Running test:

In the terminal:

```bash
npx cypress run

```

## Contributing

Fork the repo, create a new branch to make your changes and make a pull request, and I will take a look at it. Or contact me with feedback.

## Contact

Email: hallvard.dev@gmail.com
LinkedIn: https://www.linkedin.com/in/hallvard-benan-282937249/
