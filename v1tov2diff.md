# V1 to V2 - Whats The difference? (WIP)

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




## Feature Parity 
### Top Level API

### Screen API

|                     | v1     | v2         |
|---------------------|--------|------------|
| push                |  ✅     |   ✅       |
| pop                 |  ✅     |  ✅         |
| showModal           |  ✅     |  ✅   |
| popToRoot           |   ✅     |   ✅         |
| resetTo             |   ✅     |     ✅       |
| dismissModal        |   ✅     |     ✅       |
| dismissAllModals    |   ✅     |      ✅      |
| showLightBox        |   ✅     |      [Contribute](CONTRIBUTING.md)      |
| dismissLightBox     |   ✅     |       [Contribute](CONTRIBUTING.md)       |
| handleDeepLink      |   ✅     |       [Contribute](CONTRIBUTING.md)       |
| setOnNavigatorEvent |   ✅     |       [Contribute](CONTRIBUTING.md)       |
| setButtons          |   ✅     |         [Contribute](CONTRIBUTING.md)     |
| setTitle            |   ✅     |         [Contribute](CONTRIBUTING.md)     |
| toggleDrawer        |   ✅     |        ✅     |
| toggleTabs          |   ✅     |        ✅     |
| setTabBadge         |    ✅    |       [Contribute](CONTRIBUTING.md)     |
| switchToTab         |    ✅    |       ✅      |
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
## Docs
