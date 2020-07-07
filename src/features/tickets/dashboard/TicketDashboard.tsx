import React, { useContext, useEffect, useState } from "react";
import { Grid, Button, Loader } from "semantic-ui-react";
import TicketList from "./TicketList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import InfiniteScroll from "react-infinite-scroller";

const TicketDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    loadTickets,
    loadingInitial,
    setPage,
    page,
    totalPages,
  } = rootStore.ticketStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const handleGetNext = () => {
    setLoadingNext(true);
    setPage(page + 1);
    loadTickets().then(() => setLoadingNext(false));
  };

  useEffect(() => {
    loadTickets();
  }, [loadTickets]);

  if (loadingInitial && page === 0)
    return <LoadingComponent content="Loading" />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <InfiniteScroll
          pageStart={0}
          loadMore={handleGetNext}
          hasMore={!loadingNext && page + 1 < totalPages}
          initialLoad={false}
        >
          <TicketList />
        </InfiniteScroll>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filters</h2>
      </Grid.Column>
      <Grid.Column width={10}>
        <Loader active={loadingNext} />
      </Grid.Column>
    </Grid>
  );
};

export default observer(TicketDashboard);
