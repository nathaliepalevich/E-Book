import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { SearchComponent } from "./pages/search/search.component";
import { WishlistComponent } from "./pages/wishlist/wishlist.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "search", component: SearchComponent },
  { path: "wishlist", component: WishlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
