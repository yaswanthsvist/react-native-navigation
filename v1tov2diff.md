# v2 (WIP)
We are rebuilding react-native-navigation

## Why v2? 
react-native-navigation is what we run internally in Wix and is one of the most popular navigation solutions out there. So why rebuild it? 
### A New Improved Core Architecture
react-native-navigation has a few issues which are unsolvable in it’s current architecture. These issue originate from the same problem: you cannot specify on which screen you wish to make an action. Whenever you want to push, show modal or any other action, the action defaults to originate from your current screen. This covers most use cases but there are some edge cases:
What if you want to update your navbar icons and the user pops the screen? Your icons might update on the wrong screen. What if you want to push a screen as a result of a redux action? There are ways to solve some of these problems in v1 but they are not straightforward. We want to change that. 

#### From
To solve this problem in v2, every screen receives as a prop it’s screenId. Whenever you want to perform an action from that screen you use the from method: 
```js
Navigator.from(this.props.screenId).pop()
```   
### Built for Contributors 

v2 is written with contributors in mind from day 1. We want it to to be as easy and accessible as possible for anyone to contribute. Currently, it requires a lot of work to accept pull requests,  We need to manually make sure that everything works before we approve them because v1 is not thoroughly tested.

#### TDD
v2 is written in Test Driven Development. We have a test for every feature including features that are not implemented yet. This makes accepting pull requests extremely easy: If our tests pass, your pull request is accepted.


## Feature Parity

## Where is it standing now?
v2 currently supports most of react-native-navigation’s basic functions but it is still behind v1.
Here is the full comparison of features between v1 and v2 (will be updated regulary):
### Top Level API

|    API              | v1  | v2 |
|--------------------|-----|----|
| startTabBasedApp   |   ✅    |   ✅  |
| startSinglePageApp |   ✅   |  ✅   |
| registerScreen     |   ✅   |  ✅   |
| drawer             |    ✅  |    ✅ |
### Screen API

|  API              | v1     | v2         |
|---------------------|--------|------------|
| push                |  ✅     |   ✅       |
| pop                 |  ✅     |  ✅         |
| showModal           |  ✅     |  ✅   |
| popToRoot           |   ✅     |   ✅         |
| resetTo             |   ✅     |    [Contribute](CONTRIBUTING.md)      |
| dismissModal        |   ✅     |     ✅       |
| dismissAllModals    |   ✅     |      ✅      |
| showLightBox        |   ✅     |      [Contribute](CONTRIBUTING.md)      |
| dismissLightBox     |   ✅     |       [Contribute](CONTRIBUTING.md)       |
| handleDeepLink      |   ✅     |       [Contribute](CONTRIBUTING.md)       |
| setOnNavigatorEvent |   ✅     |       [Contribute](CONTRIBUTING.md)       |
| setButtons          |   ✅     |         [Contribute](CONTRIBUTING.md)     |
| setTitle            |   ✅     |         [Contribute](CONTRIBUTING.md)     |
| toggleDrawer        |   ✅     |        [Contribute](CONTRIBUTING.md)   |
| toggleTabs          |   ✅     |        [Contribute](CONTRIBUTING.md)     |
| setTabBadge         |    ✅    |       [Contribute](CONTRIBUTING.md)     |
| switchToTab         |    ✅    |        [Contribute](CONTRIBUTING.md)    |
| toggleNavBar        |   ✅     |      [Contribute](CONTRIBUTING.md)      |
| Screen Visibility   |   ✅     |       ✅     |

### Deep Links

### Shared Element Transitions

currently not supported

### Collapsing Views

currently not supported

### Styling the Navigator 

Currently no styling feature is supported.

### Adding buttons 

Currently not supported 

### Styling the Tab Bar

Currently not supported

## How can I help? 
We encourage you to help us by making any of the following tests pass.

## Getting started with v2
If v2 supports everything you need for your app we encourage you to use it. Here are the docs
## Docs

### Top Screen API

#### Navigation
```js
import Navigation from 'react-native-navigation';
```
#### Events - On App Launched
```js
Navigation.events().onAppLaunched(() => {
    Navigation.setRoot({
      container: {
        name: 'navigation.playground.WelcomeScreen'
      }
    });
  });
```

#### registerContainer
```js
Navigation.registerContainer(`navigation.playground.WelcomeScreen`, () => WelcomeScreen);
```
#### setRoot({params})
Single page with two side menu: 
```js
Navigation.setRoot({
      container: {
        name: 'navigation.playground.WelcomeScreen'
      },
      sideMenu: {
        left: {
          container: {
            name: 'navigation.playground.TextScreen',
            passProps: {
              text: 'This is a left side menu screen'
            }
          }
        },
        right: {
          container: {
            name: 'navigation.playground.TextScreen',
            passProps: {
              text: 'This is a right side menu screen'
            }
          }
        }
      }
    });
```
tabs: 
```js
Navigation.setRoot({
      tabs: [
        {
          container: {
            name: 'navigation.playground.TextScreen',
            passProps: {
              text: 'This is tab 1',
              myFunction: () => 'Hello from a function!'
            }
          }
        },
        {
          container: {
            name: 'navigation.playground.TextScreen',
            passProps: {
              text: 'This is tab 2'
            }
          }
        }
      ]
    });
```
### Screen API

#### push(params)
```js
Navigation.from(this.props.screenId).push({
      name: 'navigation.playground.PushedScreen',
      passProps: {}
    });
```
#### pop(screenId)
```js
Navigation.from(this.props.screenId).pop();
```
#### popTo(params)
```js
Navigation.from(this.props.screenId).popTo(this.props.previousScreenIds[0]);
```
#### popToRoot()
```js
Navigation.from(this.props.screenId).popToRoot();
```
#### showModal(params = {})
Show a screen as a modal.
```js
Navigation.showModal({
      container: {
        name: 'navigation.playground.ModalScreen',
        passProps: {
            key: 'value'
        }
      }
    });
```
#### dismissModal(screenId)
Dismiss modal.
```js
Navigation.dismissModal(this.props.screenId);
```
#### dismissAllModals()
Dismiss all the current modals at the same time.
```js
Navigation.dismissAllModals();
```
#### Screen Lifecycle



# old notes 
## Major Changes
Behind being written in TDD, v2 has a significantly better design which in turn changes the API. <br>
Here are the major changes: 


1) One of the major weaknesses in v1 was the inability to define on which screen you want an action to be performed.
  V2 makes it possible by changing `this.props.navigator.push()` to `Navigation.on(this.props.navigatorId).push()`.
  This removes bugs which couldn't be solved before. 
 ```js
 // v1
 this.props.navigator.pop()
 // v2
 Navigation.from(this.props.screenId).pop();
```

2) You now need to import Navigation to every screen where you wish to use it, instead of it being automatically passed by props
```js
 import Navigation from 'react-native-navigation';
 
 ...
 
 Navigation.from(this.props.screenId).pop();
```



